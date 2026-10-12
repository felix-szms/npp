# 核电站原理 · Nuclear Power Plant Principles

**从一个原子到一座城市。** 交互式核能科普展览：从铀-235 原子核出发，触发裂变，走进压水反应堆，再跟随热能、机械运动与电能，看一座城市被点亮。四章首尾相接，构成一条完整的叙事线。

**From a single atom to an entire city.** An interactive science exhibition: inspect a uranium-235 nucleus, trigger fission, explore a pressurized water reactor, and follow heat, motion and electricity to a city coming alive.

## 章节 Contents

| # | 章节 | 内容 |
|---|------|------|
| 01 | 原子 Atom | 铀-235 原子核：92 个质子 + 143 个中子，3D 可旋转、可筛选 |
| 02 | 裂变 Fission | 拖动中子撞入原子核：U-235 + n → Ba-141 + Kr-92 + 3n + 能量（≈200 MeV） |
| 03 | 反应堆 Reactor | 压水堆剖面：燃料棒、控制棒、冷却剂（水兼作慢化剂）、一/二回路与蒸汽发生器 |
| 04 | 城市 City | 蒸汽 → 汽轮机 → 发电机 → 输电 → 住宅、路灯、医院次第点亮 |

**链式反应交互演示**：裂变章完成后可打开独立演示——调节控制棒插入深度，观察次临界（链式熄灭）、临界（稳定放热）、超临界（剧烈增长）三种状态，理解反应堆为什么要把链式反应维持在临界。

科学说明弹窗内含：关键数字（每次裂变 ≈200 MeV；1 kg 铀-235 全部裂变 ≈2500 吨标准煤）、裂变产物的衰变与乏燃料放射性来源、聚变展望（结合能曲线的另一端、EAST 托卡马克）。

## 特色 Features

- **中英双语**：右上角随时切换；首次访问按浏览器语言自动选择（术语依据人教版高中物理课标词汇）
- **无障碍与降级**：全键盘可操作（方向键/空格/Home）；遵循系统"减少动态"偏好；无 WebGL2 时自动切换为完整可交互的 SVG 图示
- **自托管字体**：思源宋体（Noto Serif SC）+ Inter + JetBrains Mono，经 npm 安装打包，运行期零外部请求
- **纯本地运行**：无环境变量、无外部服务、无外部链接，适合教室与内网环境
- **可选音效**：Web Audio 混合 CC0 录音与程序化环境音（默认关闭）

## 运行 Setup

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

## 操作 Controls

- **原子**：滚动靠近；拖拽或方向键旋转；空格暂停；Home 重置；点击按钮单看质子/中子
- **裂变**：把中子拖入原子核，或点击 / 回车触发
- **反应堆 / 城市**：滚轮缩放、拖拽平移；点击场景中的编号热点查看部件讲解
- 章节导航解锁制推进；进度在本次访问内保留，刷新后重新开始

## 技术栈 Stack

Next.js 16（App Router）· React 19 · React Three Fiber / Three.js · 严格 TypeScript。单 Canvas 跨章节复用，实例化渲染、DPR 上限 1.5、无后处理；页面隐藏即停渲染。

```
src/
  app/          入口与全局样式
  components/   章节控制器、场景组件、链式反应演示、语言组件
  lib/          概念数据模型（核子/裂变/反应堆/发电）、中英文案、配色
  styles/       设计令牌与各章样式
public/audio/   CC0 音效（见 CREDITS.md）
```

## 科学边界 Scope

本应用是**教育示意，不是物理仿真或工程模型**：尺寸、时序、颜色、部件数量、功率均为示意；场景中的环境微粒是氛围效果而非辐射粒子；电子未呈现；一个原子点不亮一座城市——城市代表持续可控链式反应的集体输出。内容术语参照人教版高中物理（选择性必修第三册·原子核）与美国 NRC / EIA 的公开科普资料，引用不构成认可。本应用不用于反应堆运行指导、安全分析或操作员培训。

## 致谢与许可 Credits & License

本项目基于开源项目 [NUCLUME](https://github.com/eaabak/nuclume)（© 2026 eaabak，MIT License）二次开发，主要改动：

- 全站简体中文化（中心词典 + 双语数据表，浏览器语言自动探测）
- 排版统一：引入思源宋体/Inter/JetBrains Mono，统一各章标题字号标尺，提升对比度与小字号可读性
- 内容扩展：新增链式反应交互演示、慢化剂说明、关键数字、裂变产物衰变与聚变展望
- 移除全部外部链接，改为本地纯文本署名

本项目同样以 [MIT License](LICENSE) 发布，原作者的版权与许可声明保留于 LICENSE 文件。音效来源与 CC0 许可见 [public/audio/CREDITS.md](public/audio/CREDITS.md)。
