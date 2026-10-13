<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 项目概述

核电站原理交互科普展（Nuclear Power Plant Principles）：从铀-235 原子 → 裂变 → 压水反应堆 → 城市供电的四章叙事线，含链式反应临界状态演示。中英双语、纯本地运行（无环境变量/无外部服务/无外链）、教育示意而非物理仿真。Fork 自 eaabak 的项目并做了中文化改造，MIT 双版权。

## 技术栈

- Next.js 16.4（App Router，Turbopack）· React 19.3 · React Three Fiber 9.8 / Three.js 0.186
- 严格 TypeScript（`pnpm run typecheck`）
- 包管理器：**pnpm（平台强制，禁用 npm/yarn）**
- 自托管字体：@fontsource（Noto Serif SC / Inter / JetBrains Mono），运行期零外部请求
- 无 API 路由、无后端依赖：单页纯前端交互（WebGL 不可用时降级 SVG）

## 目录结构

```
src/app/          入口（layout.tsx、page.tsx、globals.css）
src/components/   章节控制器、3D 场景组件、链式反应演示、语言切换
src/lib/          概念数据模型（核子/裂变/反应堆/发电）、中英文案、配色
src/styles/       设计令牌与各章样式
public/audio/     CC0 音效（默认关闭）
scripts/          预览脚本（build.sh / run.sh，对应 .coze [dev]）
.cozeproj/scripts/ 部署脚本（deploy_build.sh / deploy_run.sh，对应 .coze [deploy]）
```

## 关键入口 / 核心模块

- 唯一页面 `src/app/page.tsx`；单 Canvas 跨章节复用（实例化渲染、DPR 上限 1.5）
- `next.config.ts`：显式设置 `turbopack.root = 项目根`（见"常见问题"）
- `.coze`：sub_id `59aa51d2`，project_type `web`，单层结构（`[subprojects].path = ["."]`）

## 运行与预览

- 预览：`bash scripts/run.sh` 起 `next dev`，端口从 `.preview` 读取（固定 5000），绑定 `0.0.0.0`；依赖安装走 `scripts/build.sh`（`pnpm install --frozen-lockfile`）
- 部署：`.cozeproj/scripts/deploy_build.sh`（`pnpm install && pnpm run build`）→ `deploy_run.sh`（`next start --port 5000`）
- 交付验收一律走 `test_run`（静态检查 + 探活 + 冒烟 curl）；不用 exec_shell 跑 lint/build/curl 自验证
- 调试日志：浏览器 console 看 `/app/work/logs/bypass/console.log`，服务端看 `dev.log`

## 用户偏好与长期约束

- 包管理器锁定 pnpm；npm 遗留的 `package-lock.json` 已删除（2025-10 用户确认），`pnpm-lock.yaml` 为唯一 lock
- 保持"纯本地运行"特性：不引入外部 API、外链、环境变量依赖
- 无障碍（全键盘操作、prefers-reduced-motion、WebGL 降级 SVG）是产品特性，改动 UI 时不得破坏

## 常见问题和预防

- **沙箱文件系统根存在环境遗留的 `/pnpm-lock.yaml`**：Turbopack 自动根检测会向上搜 lock 文件并告警/干扰构建，已在 `next.config.ts` 显式固定 `turbopack.root`，勿删该配置、勿动 `/pnpm-lock.yaml`
- **dev server 运行期间跑 `next build` 会污染 `.next/`**：生产构建覆盖根级 manifests 与 static chunks，导致浏览器端水合失败（按钮无反应、无动画）。跑过 build 后若预览异常：停服 → `rm -rf .next` → 重启 `scripts/run.sh`
- **`next dev` 是监督进程**：只 kill 端口 worker 会被立刻重生并重新绑端口（表现为新实例 EADDRINUSE）；清理残留必须杀整棵进程树并轮询等端口释放，`scripts/run.sh` 已内置该逻辑
- Next.js 16 相比训练数据版本有 breaking changes：写代码前先读 `node_modules/next/dist/docs/`（见顶部自动管理块）
- 端口纪律：对外只暴露 5000（从 `.preview` 读，读不到 fallback 5000），9000 系统保留绝不 kill
- 本项目无 lint 脚本；类型校验用 `pnpm run typecheck`（`next typegen && tsc --noEmit`）
