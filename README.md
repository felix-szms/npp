# 核电站原理 · Nuclear Power Plant Principles

**[中文](#中文) | [English](#english)**

---

<a id="中文"></a>

## 从一个原子到一座城市

交互式核能科普展览：从铀-235 原子核出发，触发裂变，走进压水反应堆，再跟随热能、机械运动与电能，看一座城市被点亮。四章首尾相接，构成一条完整的叙事线。

> From a single atom to an entire city — an interactive journey through the science of nuclear energy.

### 章节

| # | 章节 | 内容 |
|---|------|------|
| 01 | 原子 Atom | 铀-235 原子核：92 个质子 + 143 个中子，3D 可旋转、可筛选 |
| 02 | 裂变 Fission | 拖动中子撞入原子核：U-235 + n → Ba-141 + Kr-92 + 3n + 能量（≈200 MeV） |
| 03 | 反应堆 Reactor | 压水堆剖面：燃料棒、控制棒、冷却剂（水兼作慢化剂）、一/二回路与蒸汽发生器 |
| 04 | 城市 City | 蒸汽 → 汽轮机 → 发电机 → 输电 → 住宅、路灯、医院次第点亮 |

**链式反应交互演示**：裂变章完成后可打开独立演示——调节控制棒插入深度，观察次临界（链式熄灭）、临界（稳定放热）、超临界（剧烈增长）三种状态，理解反应堆为什么要把链式反应维持在临界。

科学说明弹窗内含：关键数字（每次裂变 ≈200 MeV；1 kg 铀-235 全部裂变 ≈2500 吨标准煤）、裂变产物的衰变与乏燃料放射性来源、聚变展望（结合能曲线的另一端、EAST 托卡马克）。

### 特色

- **中英双语**：右上角随时切换；首次访问按浏览器语言自动选择（术语依据人教版高中物理课标词汇）
- **无障碍与降级**：全键盘可操作（方向键/空格/Home）；遵循系统"减少动态"偏好；无 WebGL2 时自动切换为完整可交互的 SVG 图示
- **自托管字体**：思源宋体（Noto Serif SC）+ Inter + JetBrains Mono，经 npm 安装打包，运行期零外部请求
- **纯本地运行**：无环境变量、无外部服务、无外部链接，适合教室与内网环境
- **可选音效**：Web Audio 混合 CC0 录音与程序化环境音（默认关闭）

### 运行

需要 Node.js 22+ 与 npm。

```sh
npm ci
npm run dev
```

打开 [localhost:3000](http://localhost:3000)。生产模式：

```sh
npm run build
npm start
```

校验：`npm run typecheck`

**服务器部署**：`npm ci && npm run build && npm start`，默认监听 3000 端口（`next start -p 端口号` 可自定义）；建议以 systemd / pm2 守护，并由 Nginx 等反向代理对外提供 HTTPS。

### 操作

- **原子**：滚动靠近；拖拽或方向键旋转；空格暂停；Home 重置；点击按钮单看质子/中子
- **裂变**：把中子拖入原子核，或点击 / 回车触发
- **反应堆 / 城市**：滚轮缩放、拖拽平移；点击场景中的编号热点查看部件讲解
- 章节导航解锁制推进；进度在本次访问内保留，刷新后重新开始

### 技术栈

Next.js 16（App Router）· React 19 · React Three Fiber / Three.js · 严格 TypeScript。单 Canvas 跨章节复用，实例化渲染、DPR 上限 1.5、无后处理；页面隐藏即停渲染。

```
src/
  app/          入口与全局样式
  components/   章节控制器、场景组件、链式反应演示、语言组件
  lib/          概念数据模型（核子/裂变/反应堆/发电）、中英文案、配色
  styles/       设计令牌与各章样式
public/audio/   CC0 音效（见 CREDITS.md）
```

### 科学边界

本应用是**教育示意，不是物理仿真或工程模型**：尺寸、时序、颜色、部件数量、功率均为示意；场景中的环境微粒是氛围效果而非辐射粒子；电子未呈现；一个原子点不亮一座城市——城市代表持续可控链式反应的集体输出。内容术语参照人教版高中物理（选择性必修第三册·原子核）与美国 NRC / EIA 的公开科普资料，引用不构成认可。本应用不用于反应堆运行指导、安全分析或操作员培训。

### 致谢与许可

本项目基于开源项目 [NUCLUME](https://github.com/eaabak/nuclume)（© 2026 eaabak，MIT License）二次开发，主要改动：

- 全站简体中文化（中心词典 + 双语数据表，浏览器语言自动探测）
- 排版统一：引入思源宋体/Inter/JetBrains Mono，统一各章标题字号标尺，提升对比度与小字号可读性
- 内容扩展：新增链式反应交互演示、慢化剂说明、关键数字、裂变产物衰变与聚变展望
- 移除全部外部链接，改为本地纯文本署名

本项目同样以 [MIT License](LICENSE) 发布，原作者的版权与许可声明保留于 LICENSE 文件。音效来源与 CC0 许可见 [public/audio/CREDITS.md](public/audio/CREDITS.md)。

---

<a id="english"></a>

## From a Single Atom to an Entire City

An interactive science exhibition on nuclear energy: inspect a uranium-235 nucleus, trigger fission, step inside a pressurized water reactor, then follow heat, mechanical motion and electricity as a city comes alive. Four chapters connect into one continuous journey.

> 从一个原子到一座城市——一次对核能科学的交互式探索。

### Chapters

| # | Chapter | Contents |
|---|---------|----------|
| 01 | Atom | A uranium-235 nucleus: 92 protons + 143 neutrons, rotatable in 3D with particle filters |
| 02 | Fission | Drag a neutron into the nucleus: U-235 + n → Ba-141 + Kr-92 + 3n + energy (≈200 MeV) |
| 03 | Reactor | A PWR cutaway: fuel rods, control rods, coolant (water doubles as moderator), primary/secondary circuits and the steam generator |
| 04 | City | Steam → turbine → generator → transmission → homes, streetlights and a hospital lighting up in sequence |

**Interactive chain-reaction demo**: after the fission chapter, open a standalone demonstration — adjust control-rod insertion and watch subcritical (chain dies out), critical (steady release) and supercritical (rapid growth) regimes, and why a reactor holds the chain at criticality.

The science dialog includes key numbers (≈200 MeV per fission; 1 kg of fully fissioned U-235 ≈ 2,500 tonnes of coal), decay of fission products and the origin of spent-fuel radioactivity, and an outlook on fusion (the other end of the binding-energy curve, EAST tokamak).

### Features

- **Bilingual (中文 / English)**: switch anytime from the top-right corner; the first visit follows the browser language
- **Accessibility & graceful degradation**: full keyboard operation (arrows / Space / Home); honors the system reduced-motion preference; falls back to fully interactive SVG illustrations without WebGL2
- **Self-hosted fonts**: Noto Serif SC + Inter + JetBrains Mono, installed via npm and bundled — zero external requests at runtime
- **Fully local**: no environment variables, external services or outbound links — classroom- and intranet-friendly
- **Optional sound**: Web Audio mix of CC0 recordings and procedural ambience (off by default)

### Setup

Requires Node.js 22+ and npm.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For production:

```sh
npm run build
npm start
```

Validate with `npm run typecheck`.

**Server deployment**: run `npm ci && npm run build && npm start`; the server listens on port 3000 by default (`next start -p PORT` to change). Run it under a supervisor such as systemd or pm2 and expose it via an HTTPS reverse proxy (e.g. Nginx).

### Controls

- **Atom**: scroll to approach; drag or use arrow keys to rotate; Space pauses; Home resets; filter protons/neutrons with the buttons
- **Fission**: drag the neutron into the nucleus, or click / press Enter
- **Reactor / City**: wheel or pinch to zoom, drag to pan; click the numbered hotspots in the scene for part explanations
- Chapters unlock progressively; progress persists for the current visit and resets on reload

### Tech Stack

Next.js 16 (App Router) · React 19 · React Three Fiber / Three.js · strict TypeScript. One canvas reused across chapters with instanced rendering, a 1.5 DPR cap and no postprocessing; rendering stops when the tab is hidden.

```
src/
  app/          entry & global styles
  components/   chapter controllers, scene components, chain demo, language UI
  lib/          conceptual data models (nucleus/fission/reactor/power), zh copy, colors
  styles/       design tokens & per-chapter styles
public/audio/   CC0 sounds (see CREDITS.md)
```

### Scientific Scope

This application is an **educational illustration, not a physical simulation or engineering model**: dimensions, timing, colors, component counts and power output are illustrative; ambient motes are atmosphere, not emitted particles; electrons are not shown; one atom cannot power a city — the city represents the collective output of a sustained, controlled chain reaction. Terminology follows the PEP high-school physics curriculum and public educational materials from the U.S. NRC and EIA; citation does not imply endorsement. This application is not reactor-operation guidance, safety analysis or operator training.

### Credits & License

This project is derived from the open-source [NUCLUME](https://github.com/eaabak/nuclume) project (© 2026 eaabak, MIT License). Main modifications:

- Full Simplified Chinese localization (central dictionary + bilingual data tables, browser-language detection)
- Typography overhaul: Noto Serif SC / Inter / JetBrains Mono, a unified heading scale across chapters, improved contrast and small-text readability
- Content additions: the interactive chain-reaction demo, the moderator explanation, key numbers, fission-product decay and the fusion outlook
- All external links removed in favor of local plain-text attribution

This project is likewise released under the [MIT License](LICENSE); the original author's copyright and license notice are preserved in the LICENSE file. Sound sources and CC0 licenses: [public/audio/CREDITS.md](public/audio/CREDITS.md).
