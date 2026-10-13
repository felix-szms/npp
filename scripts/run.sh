#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# 从 .preview 读取 expose_port，读取不到 fallback 5000
EXPOSE_PORT=$(awk -F '[ =]+' '/^expose_port/ {gsub(/[^0-9]/, "", $2); print $2; exit}' .preview 2>/dev/null || echo 5000)

# 清理残留（绝不碰 9000）：next dev 是监督进程，只杀端口 worker 会被立刻重生，
# 必须连同监督进程一起杀，并轮询等待端口真正释放
pkill -f "next dev --hostname 0.0.0.0 --port ${EXPOSE_PORT}" 2>/dev/null || true
fuser -k "${EXPOSE_PORT}/tcp" 2>/dev/null || true
for _ in $(seq 1 20); do
  ss -lptnH "sport = :${EXPOSE_PORT}" 2>/dev/null | grep -q . || break
  sleep 0.5
done

exec pnpm exec next dev --hostname 0.0.0.0 --port "$EXPOSE_PORT"
