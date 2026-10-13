#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# 从 .preview 读取 expose_port，读取不到 fallback 5000
EXPOSE_PORT=$(awk -F '[ =]+' '/^expose_port/ {gsub(/[^0-9]/, "", $2); print $2; exit}' .preview 2>/dev/null || echo 5000)

# 清理残留（绝不碰 9000）：擎下监督进程 + 端口 worker，轮询等待端口真正释放
pkill -f "next-start --hostname 0.0.0.0 --port ${EXPOSE_PORT}" 2>/dev/null || true
pkill -f "next start --hostname 0.0.0.0 --port ${EXPOSE_PORT}" 2>/dev/null || true
fuser -k "${EXPOSE_PORT}/tcp" 2>/dev/null || true
for _ in $(seq 1 20); do
  ss -lptnH "sport = :${EXPOSE_PORT}" 2>/dev/null | grep -q . || break
  sleep 0.5
done

# 生产模式运行：平台预览代理下 dev 模式的 flight 流式水合存在竞态（hydrateRoot 永不执行），
# next start 无此问题。构建产物由 build.sh（deploy/_build.sh）保证存在。
exec pnpm exec next start --hostname 0.0.0.0 --port "$EXPOSE_PORT"