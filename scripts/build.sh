#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# 放置依赖 + 生产构建产物。预览与部署都走 next start（生产模式），
# 因此预览的 build 必须产出 production 构建，而非仅 install。
pnpm install --frozen-lockfile
rm -rf .next
pnpm run build