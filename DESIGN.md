# DESIGN.md — 深圳中学定制版设计规范（简化版）

## 定制边界（用户确认）

定制只保留**校名出现**，不做视觉改版：

- Wordmark 副标：`深圳中学`（zh）/ `SHENZHEN MIDDLE SCHOOL`（en）
- 页面 title：`核电站原理 · 深圳中学`（zh）/ `Nuclear Power Plant Principles · Shenzhen Middle School`（en）
- metadata description：以"核电站原理 · 深圳中学"开头

除此之外的视觉体系（配色、徽章、字体、3D 场景材质色）保持上游原版：

- 强调色 `--amber: #caaa7d`（灰琥珀）、交互蓝 `--blue: #8aadc8`、夜空底 `--background: #090d12`
- 品牌符号：原子轨道 SVG，无徽章圆环装饰
- 字体：Noto Serif SC 900（中文标题）+ Inter + JetBrains Mono

## 设计禁忌

- 不引入校徽图片、凤凰木插画等重装饰（纯本地运行约束 + 用户要求仅校名）
- 不改四幕叙事结构与交互节奏
- 不使用紫色渐变、科技蓝渐变等通用 AI 审美

## 备注

2026-10 曾做"凤凰橙 + 深中蓝"全站改色方案，用户反馈"只需要出现校名即可"，已全部回退。若未来恢复完整品牌化，意象素材（凤凰木/1947/校训）调研沉淀在 git 历史与本文件的早期版本中。
