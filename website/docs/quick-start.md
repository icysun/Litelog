---
sidebar_position: 2
---

# Quick Start

Get LiteLog running in under 60 seconds.

## 1. Install

```bash
git clone https://github.com/yashnaiduu/Litelog.git
cd Litelog
go build -o litelog cmd/litelog/main.go
```

Optionally move to your PATH:

```bash
mv litelog /usr/local/bin/litelog
```

## 2. Start the server

```bash
./litelog start
```

The server starts on port `8080` and creates `litelog.db` automatically.

## 3. Send your first log

```bash
curl -X POST http://localhost:8080/ingest \
  -H "Content-Type: application/json" \
  -d '{"level": "INFO", "service": "my-app", "message": "hello litelog"}'
```

## 4. Query it

```bash
./litelog query "SELECT * FROM logs"
```

## 5. Watch logs live

Open a new terminal:

```bash
./litelog tail
```

Now send more logs and watch them appear instantly.

## 6. Open the dashboard

```bash
./litelog dashboard
```

Press `q` to quit.
