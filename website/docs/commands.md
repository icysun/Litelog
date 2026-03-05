---
sidebar_position: 3
---

# Commands

Full reference for every LiteLog command and flag.

---

## `litelog start`

Starts the HTTP ingestion server.

```bash
litelog start
litelog start --port 9090
litelog start --db /var/log/litelog.db
litelog start --retention 7d
```

| Flag | Default | Description |
|---|---|---|
| `--port` / `-p` | `8080` | Port to listen on |
| `--db` | `litelog.db` | Path to SQLite database |
| `--retention` | _(disabled)_ | Auto-delete logs older than this (e.g. `7d`, `24h`, `30m`) |

---

## `litelog ingest`

Reads from stdin and forwards each line to the ingestion server.

```bash
python app.py 2>&1 | litelog ingest
docker logs my-container | litelog ingest
./my-binary 2>&1 | litelog ingest --url http://localhost:9090
```

| Flag | Default | Description |
|---|---|---|
| `--url` | `http://localhost:8080` | Ingestion server base URL |

Log levels are auto-detected from keywords: `ERROR`, `WARN`, `DEBUG`. Everything else defaults to `INFO`.

---

## `litelog query`

Runs a raw SQL query against the logs database.

```bash
litelog query "SELECT * FROM logs LIMIT 10"
litelog query "SELECT * FROM logs WHERE level = 'ERROR'"
litelog query "SELECT service, COUNT(*) FROM logs GROUP BY service"
litelog query "SELECT * FROM logs WHERE timestamp >= datetime('now', '-5 minutes')"
```

| Flag | Default | Description |
|---|---|---|
| `--db` | `litelog.db` | Path to SQLite database |

### Schema

```sql
CREATE TABLE logs (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  level     TEXT,
  service   TEXT,
  message   TEXT
);
```

---

## `litelog tail`

Streams new logs in real-time to stdout. Polls every 500ms.

```bash
litelog tail
litelog tail --level ERROR
litelog tail --service auth-service
litelog tail --level WARN --service payment-api
```

| Flag | Default | Description |
|---|---|---|
| `--db` | `litelog.db` | Path to SQLite database |
| `--level` | _(all)_ | Filter by log level |
| `--service` | _(all)_ | Filter by service name |

Press `Ctrl+C` to stop.

---

## `litelog dashboard`

Opens a full-screen terminal dashboard. Updates every second.

```bash
litelog dashboard
```

| Flag | Default | Description |
|---|---|---|
| `--db` | `litelog.db` | Path to SQLite database |

Press `q` to quit.

---

## `litelog export`

Exports logs to stdout as JSON or CSV.

```bash
litelog export > all-logs.json
litelog export --format csv > all-logs.csv
litelog export --service auth-service > auth.json
litelog export --service payment-api --format csv > payments.csv
```

| Flag | Default | Description |
|---|---|---|
| `--db` | `litelog.db` | Path to SQLite database |
| `--format` | `json` | Output format: `json` or `csv` |
| `--service` | _(all)_ | Filter by service name |
