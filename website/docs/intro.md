---
sidebar_position: 1
---

# Introduction

**LiteLog** is a hyper-fast, zero-dependency, single-binary log aggregation system.

It replaces heavyweight stacks like ELK or Prometheus/Grafana for developers who need:

- Centralized log collection across multiple services
- SQL-powered log queries directly in the terminal
- Real-time log streaming
- A live terminal dashboard

## The Problem

Most developers running side projects, indie SaaS, or small production systems resort to:

```bash
tail -f app.log | grep error
```

This gives you no persistence, no structure, no cross-service view.

Heavy stacks like ELK require 2GB+ RAM, multiple containers, and hours of configuration.

## The Solution

```bash
./litelog start
```

One command. A full logging stack. 40MB of RAM.

## Core Commands

| Command | What it does |
|---|---|
| `litelog start` | Start the ingestion server |
| `litelog ingest` | Pipe any program's stdout/stderr into LiteLog |
| `litelog query` | Run SQL queries on your logs |
| `litelog tail` | Stream real-time logs |
| `litelog dashboard` | Open the live terminal dashboard |
| `litelog export` | Export logs to JSON or CSV |
