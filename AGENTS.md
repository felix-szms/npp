<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 项目概述

核电站原理交互科普展（Nuclear Power Plant Principles）：从铀-235 原子 → 裂变 → 压水反应堆 → 城市供电的四章叙事线，含链式反应临界状态演示。中英双语、纯本地运行（无环境变量/无外部服务/无外链）、教育示意而非物理仿真。Fork 自 eaabak 的项目并做了中文化改造，MIT 双版权。**深圳中学定制版（2026-10 用户要求简化）**：仅在 wordmark 副标与页面 title 出现校名（"SHENZHEN MIDDLE SCHOOL" / "深圳中学"），配色/徽章/署名保持上游原版；早期"凤凰橙+深中蓝+EST.1947 署名"方案已按用户要求回退（设计规范见 DESIGN.md）。音效系统已于 2026-10 按用户要求整体移除。

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
src/lib/          概念数据模型（核子/裂变/反应堆/发电）、中英文案、历史时间线与前沿卡片数据（history.ts / frontier.ts）、配色（scene-colors.ts 为 3D 材质色，tokens.css 为 UI 令牌）
src/styles/       设计令牌与各章样式（时间线/前沿卡片样式在 experience.css 末段）
scripts/          预览脚本（build.sh / run.sh，对应 .coze [dev]）
.cozeproj/scripts/ 部署脚本（deploy_build.sh / deploy_run.sh，对应 .coze [deploy]）
```

2026-10 新增内容模块（按用户要求调研后实施）：
- **核电简史时间线**（`history-dialog.tsx` + `lib/history.ts`）：Header 时钟按钮入口，四代区段导览 + 15 条里程碑（世界/中国/深圳分区徽章，深圳 1994 大亚湾条目高亮）
- **前沿核能卡片**（`frontier-dialog.tsx` + `lib/frontier.ts`）：Header 聚变图标按钮入口，6 张卡片（SMR/高温气冷堆/钠冷快堆/熔盐堆/可控聚变/非电应用），聚变卡内嵌 2D 演示
- **聚变演示**（`fusion-demo.tsx`）：canvas 状态机 D+T→He-4+n（17.6 MeV），3.4s 时间轴，prefers-reduced-motion 直接呈现结果帧；canvas font 不支持 CSS var()，须用字面字体栈

音效已整体移除：journey-audio.tsx / journey-sound.ts / public/audio/ 已删，勿再引入 AudioContext 相关代码。

## 关键入口 / 核心模块

- 唯一页面 `src/app/page.tsx`；单 Canvas 跨章节复用（实例化渲染、DPR 上限 1.5）
- `next.config.ts`：显式设置 `turbopack.root = 项目根`（见"常见问题"）
- `.coze`：sub_id `59aa51d2`，project_type `web`，单层结构（`[subprojects].path = ["."]`）

## 运行与预览

- 预览：`bash scripts/run.sh` 起 `next start`（**生产模式**），端口从 `.preview` 读取（固定 5000），绑定 `0.0.0.0`；依赖安装 + 生产构建走 `scripts/build.sh`（`pnpm install --frozen-lockfile`）
- 部署：`.cozeproj/scripts/deploy_build.sh`（`pnpm install && pnpm run build`）→ `deploy_run.sh`（`next start --port 5000`）
- 交付验收一律走 `test_run`（静态检查 + 探活 + 冒烟 curl）；不用 exec_shell 跑 lint/build/curl 自验证
- 调试日志：浏览器 console 看 `/app/work/logs/bypass/console.log`，服务端看 `dev.log`

## 用户偏好与长期约束

- 包管理器锁定 pnpm；npm 遗留的 `package-lock.json` 已删除（2025-10 用户确认），`pnpm-lock.yaml` 为唯一 lock
- 保持"纯本地运行"特性：不引入外部 API、外链、环境变量依赖
- 无障碍（全键盘操作、prefers-reduced-motion、WebGL 降级 SVG）是产品特性，改动 UI 时不得破坏

## 常见问题和预防

- **链式反应控制棒深度**：`chain-dialog.tsx` 的 `ROD_AREA` 是"控制棒可达深度占容器高度的比例"（现 0.92），渲染与中子吸收判定共用该常量，改一处即可；曾因 0.44 导致"滑块 100% 但图示只插一半"
- **无头浏览器验证裂变动画慢**：软件渲染下 rAF 帧率低，`use-fission` 每帧 elapsed 上限 0.1s → 时间轴被拉长数倍；测试需加 `--disable-background-timer-throttling` 并耐心等待 stage complete（链式反应按钮在 `reaction.stage === "complete"` 才渲染）

- **预览必须用 `next start`（生产模式），不能用 `next dev`**：平台预览代理链路（dev.coze.site 透传）下，`next dev` 的 React flight 流式水合存在竞态——`app-index.js` 中 `hydrate()` 的 `await initialServerResponse` 永不返回，`hydrateRoot` 永不执行，表现为：页面只有 SSR 静态壳（LOGO/章节按钮/MobileContent 可见），但原子区域黑屏、所有按钮/滚动切章无响应，且**无任何报错**（console 仅 dev overlay commit，无应用树 commit；`[scene-diag]` 也不出现）。切 `next start` 后完全正常。改预览脚本/起服务时务必走 `scripts/run.sh`（next start），勿改回 next dev
- **无 GPU 环境下 3D 场景不渲染/无动画**：WebGL 探测曾用 `failIfMajorPerformanceCaveat: true`，软件渲染的 WebGL2（预览面板/虚拟机/关硬件加速的浏览器）会被判 null → 永久降级 SVG 静态模式。已在 `src/components/use-scene-environment.ts` 移除该标志，软件 WebGL2 也走完整 3D 场景；仅真正无 WebGL2 才降级。勿再加回该标志
- **前端交互问题用无头浏览器实测**：沙箱 `/root/.cache/ms-playwright` 有 chromium 二进制，在项目外（如 `/tmp/pwtest`）`pnpm add playwright-core` 并显式 `executablePath` 指向缓存二进制即可真实渲染验证。注意 Playwright 的 `locator.click` 在持续 rAF 动画 + 软件渲染下会因稳定性启发式超时，需用 `page.evaluate` 合成点击验证真实响应
- **沙箱文件系统根存在环境遗留的 `/pnpm-lock.yaml`**：Turbopack 自动根检测会向上搜 lock 文件并告警/干扰构建，已在 `next.config.ts` 显式固定 `turbopack.root`，勿删该配置、勿动 `/pnpm-lock.yaml`
- **dev server 运行期间跑 `next build` 会污染 `.next/`**：生产构建覆盖根级 manifests 与 static chunks，导致浏览器端水合失败（按钮无反应、无动画）。跑过 build 后若预览异常：停服 → `rm -rf .next` → 重启 `scripts/run.sh`
- **`next dev` 是监督进程**：只 kill 端口 worker 会被立刻重生并重新绑端口（表现为新实例 EADDRINUSE）；清理残留必须杀整棵进程树并轮询等端口释放，`scripts/run.sh` 已内置该逻辑
- Next.js 16 相比训练数据版本有 breaking changes：写代码前先读 `node_modules/next/dist/docs/`（见顶部自动管理块）
- 端口纪律：对外只暴露 5000（从 `.preview` 读，读不到 fallback 5000），9000 系统保留绝不 kill
- 本项目无 lint 脚本；类型校验用 `pnpm run typecheck`（`next typegen && tsc --noEmit`）
- 开篇序列是滚动驱动的（`use-atom-opening.ts` 按滚动进度切 beat），“发送中子”等按钮在滚到对应 beat 才可用，属正常设计而非 bug
- **`pkill -f "next start"` 会自杀 shell**：pkill -f 匹配整条命令行，exec_shell 的 bash 进程命令行里含 "next start" 字样即被杀，后续命令静默不执行（表现为输出被吞、构建没跑）。清理服务进程用不自匹配的模式：`pkill -f 'next-serv[e]r'`，再用 `fuser -k 5000/tcp` + `ss` 确认端口释放
