---
sidebar_position: 4
---

# Architecture

How LiteLog works internally.

## Data Flow

```
Applications / Docker / Scripts
          │
          ▼ HTTP POST /ingest
   HTTP Ingestion Server
          │
          ▼
   In-Memory Log Queue (channel, 100k buffer)
          │
          ▼
   Async Worker (goroutine, flushes every 200ms or 100 entries)
          │
          ▼
   SQLite Storage Engine (WAL mode)
          │
   ┌──────┼──────────┐
   ▼      ▼          ▼
query   tail     dashboard
(SQL)  (poll)   (aggregation)
```

## Performance Design

### In-Memory Queue
The HTTP handler never touches the database. Every incoming log is pushed onto a **Go channel** (buffered to 100,000 entries). The handler returns `200 OK` immediately — your app is never blocked by disk I/O.

### Batch Inserts
A background goroutine drains the queue and writes using a **single SQL transaction per batch**:

```sql
BEGIN;
INSERT INTO logs (level, service, message) VALUES (?, ?, ?);
INSERT INTO logs (level, service, message) VALUES (?, ?, ?);
...
COMMIT;
```

This is orders of magnitude faster than one transaction per log.

### SQLite WAL Mode
LiteLog runs SQLite in **Write-Ahead Log mode**:

```sql
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA temp_store = MEMORY;
```

WAL allows concurrent reads while writes are happening — so `litelog tail` and `litelog dashboard` read without blocking ingestion.

## Database Schema

```sql
CREATE TABLE logs (
  id        INTEGER  PRIMARY KEY AUTOINCREMENT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  level     TEXT,
  service   TEXT,
  message   TEXT
);

CREATE INDEX idx_logs_level     ON logs(level);
CREATE INDEX idx_logs_service   ON logs(service);
CREATE INDEX idx_logs_timestamp ON logs(timestamp);
```

Indexes on `level`, `service`, and `timestamp` keep filter queries fast even with millions of rows.

## Why SQLite?

- Zero setup — a single `.db` file
- Supports full SQL including `GROUP BY`, `COUNT`, `WHERE`, date functions
- WAL mode gives concurrent read/write
- Proven at scale — SQLite handles billions of rows on commodity hardware
