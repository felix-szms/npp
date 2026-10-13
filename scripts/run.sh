#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# 从 .preview 读取 expose_port，读取不到 fallback 5000
EXPOSE_PORT=$(awk -F '[ =]+' '/^expose_port/ {gsub(/[^0-9]/, "", $2); print $2; exit}' .preview 2>/dev/null || echo 5000)

# 清理残留（绝不碰 9000）
fuser -k "${EXPOSE_PORT}/tcp" 2>/dev/null || true
sleep 1

exec pnpm exec next dev --hostname 0.0.0.0 --port "$EXPOSE_PORT"
