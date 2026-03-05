# LiteLog Usage Guide

A step-by-step guide to get LiteLog running and understand every command.

---

## Prerequisites

- Go 1.21+
- macOS, Linux, or any Unix-based system

---

## 1. Install

**Clone and build from source:**

```bash
git clone https://github.com/yashnaiduu/Litelog.git
cd Litelog
go build -o litelog cmd/litelog/main.go
```

You now have a single `litelog` binary. Move it to your PATH for convenience:

```bash
mv litelog /usr/local/bin/litelog
```

Verify:

```bash
litelog --help
```

---

## 2. Start the Server

```bash
litelog start
```

This starts the HTTP ingestion server on port `8080` and creates `litelog.db` automatically.

**Custom port:**

```bash
litelog start --port 9090
```

**Custom database path:**

```bash
litelog start --db /var/log/litelog.db
```

**With automatic log retention:**

```bash
litelog start --retention 7d   # delete logs older than 7 days
litelog start --retention 24h  # delete logs older than 24 hours
litelog start --retention 30m  # delete logs older than 30 minutes
```

---

## 3. Send Logs

### Via curl

```bash
curl -X POST http://localhost:8080/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "level": "ERROR",
    "service": "auth-service",
    "message": "JWT token expired"
  }'
```

Valid levels: `INFO`, `WARN`, `ERROR`, `DEBUG`

### Via pipe (stdin)

Pipe any program's output directly into LiteLog:

```bash
python my_app.py 2>&1 | litelog ingest
```

```bash
docker logs my-container | litelog ingest
```

```bash
./my-binary 2>&1 | litelog ingest --url http://localhost:8080
```

LiteLog will auto-detect the log level from keywords in each line (`ERROR`, `WARN`, `DEBUG`).

---

## 4. Query Logs

Use standard SQL to query your logs:

```bash
# View last 10 logs
litelog query "SELECT * FROM logs ORDER BY id DESC LIMIT 10"

# Filter by level
litelog query "SELECT * FROM logs WHERE level = 'ERROR'"

# Filter by service
litelog query "SELECT * FROM logs WHERE service = 'auth-service'"

# Count errors per service
litelog query "SELECT service, COUNT(*) FROM logs WHERE level='ERROR' GROUP BY service"

# Logs in the last 5 minutes
litelog query "SELECT * FROM logs WHERE timestamp >= datetime('now', '-5 minutes')"
```

**Custom database path:**

```bash
litelog query "SELECT COUNT(*) FROM logs" --db /var/log/litelog.db
```

---

## 5. Stream Live Logs

Watch logs appear in real-time:

```bash
litelog tail
```

**Filter by level:**

```bash
litelog tail --level ERROR
litelog tail --level WARN
```

**Filter by service:**

```bash
litelog tail --service auth-service
litelog tail --service payment-api
```

**Combine filters:**

```bash
litelog tail --level ERROR --service auth-service
```

Press `Ctrl+C` to stop.

---

## 6. Open the Dashboard

```bash
litelog dashboard
```

Opens a full-screen terminal dashboard showing:

- **Logs/sec** — real-time ingestion rate
- **Total Logs** — total stored log count
- **Active Services** — distinct services seen in the last 5 minutes
- **Errors/min** — error rate over the last minute
- **Top Services** — most active services by log count
- **Recent Errors** — last 5 error logs with timestamps

Press `q` to quit the dashboard.

---

## 7. Export Logs

Export logs to JSON:

```bash
litelog export > all-logs.json
```

Export logs to CSV:

```bash
litelog export --format csv > all-logs.csv
```

Filter by service:

```bash
litelog export --service auth-service > auth-logs.json
litelog export --service payment-api --format csv > payments.csv
```

---

## 8. Full Demo Walkthrough

Open 4 terminal windows and run each command in a separate one:

**Terminal 1 — Start the server:**
```bash
./litelog start --retention 7d
```

**Terminal 2 — Simulate log traffic:**
```bash
python3 fake_logs.py | ./litelog ingest
```

**Terminal 3 — Stream live:**
```bash
./litelog tail --level ERROR
```

**Terminal 4 — Run a query:**
```bash
./litelog query "SELECT service, COUNT(*) FROM logs GROUP BY service ORDER BY COUNT(*) DESC"
```

Then switch Terminal 3 to the dashboard:
```bash
./litelog dashboard
```

---

## Command Reference

| Command | Description |
|---|---|
| `litelog start` | Start the ingestion server |
| `litelog start --port 9090` | Start on a custom port |
| `litelog start --retention 7d` | Auto-delete logs older than 7 days |
| `litelog ingest` | Pipe stdin logs to the server |
| `litelog query "<sql>"` | Run a SQL query against logs |
| `litelog tail` | Stream real-time logs |
| `litelog tail --level ERROR` | Stream only error logs |
| `litelog tail --service <name>` | Stream logs from one service |
| `litelog dashboard` | Open the live terminal dashboard |
| `litelog export` | Export logs as JSON |
| `litelog export --format csv` | Export logs as CSV |
| `litelog export --service <name>` | Export logs filtered by service |
