import type { ParticleFilter } from "./nucleus";
import {
  REACTOR_PARTS,
  type ReactorStage,
} from "./reactor";
import { POWER_PARTS, CITY_PLACES } from "./power";

// Simplified Chinese copy for the nuclear power plant principles experience.
// Keys of ZH_TEXT must match the English first argument of every t() call
// exactly (punctuation, dashes and trailing spaces included).
// Scientific terms follow the PEP (人教版) high-school physics vocabulary:
// fission 裂变 · chain reaction 链式反应 · PWR 压水反应堆 · control rods 控制棒
// coolant 冷却剂 · primary/secondary circuit 一回路/二回路 · nucleon 核子.

export const ZH_TEXT: Record<string, string> = {
  // atom-experience
  "Skip to city exploration": "跳转到城市探索",
  "Skip to reactor exploration": "跳转到反应堆探索",
  "Skip to reaction": "跳转到裂变反应",
  "Skip to exploration": "跳转到探索",
  "Conceptual journey from reactor heat to a powered city":
    "从反应堆热能到城市供电的示意旅程",
  "Conceptual pressurized water reactor": "示意压水反应堆",
  "Conceptual uranium-235 fission": "示意铀-235 裂变",
  "Interactive uranium-235 nucleus": "可交互的铀-235 原子核",
  "A conceptual uranium-235 nucleus, containing 92 protons and 143 neutrons. Scroll or use the exploration buttons to move closer. Drag with a mouse or use arrow keys to rotate. Space pauses motion. Home resets the view. Colors, positions, motion, and atmospheric motes are illustrative, not a physical simulation.":
    "这是一个示意性的铀-235 原子核，由 92 个质子和 143 个中子组成。滚动页面或使用探索按钮靠近观察；用鼠标拖拽或方向键旋转视角，空格键暂停运动，Home 键重置视图。颜色、位置、运动与环境微粒均为示意，并非物理仿真。",
  "STATIC VIEW · 3D is unavailable. The illustrated model remains interactive.":
    "静态视图 · 3D 不可用，图示模型仍可交互。",

  // atom-opening
  "A world": "方寸之间，",
  "within.": "别有世界。",
  "Before a city comes to light,": "在一座城市被点亮之前，",
  "a story begins inside an atom.": "故事从一个原子的内部开始。",
  "Come closer": "靠近一点",
  "URANIUM–235 / A CLOSER LOOK": "铀-235 / 近距离观察",
  "235 particles.": "235 个粒子，",
  "One nucleus.": "同属一个原子核。",
  "Highlight particles": "高亮粒子",
  "protons": "质子",
  "neutrons": "中子",
  "What changes everything?": "什么改变了一切？",
  "The science": "科学说明",
  "AT THE THRESHOLD": "临界一刻",
  "One neutron": "一个中子",
  "is enough.": "便已足够。",
  "Drag the neutron into the nucleus. Or select it. The next moment is yours.":
    "把中子拖入原子核，或直接点击它。下一刻由你触发。",
  "Your reaction is waiting where you left it.":
    "你的反应停留在上次进行的地方。",
  "Send the neutron": "发射中子",
  "Return to the reaction": "返回裂变反应",
  "Return to the opening": "返回开场",
  "Beginning": "回到开头",
  "Your move": "轮到你了",
  "Scroll to discover": "滚动以继续探索",

  // experience-chrome
  "Nuclear Power Plant home": "核电站原理 · 首页",
  "Turn sound design off": "关闭声音设计",
  "Turn sound design on": "开启声音设计",
  "Optional sound design": "可选的声音设计",
  "Pause city motion": "暂停城市运动",
  "Resume city motion": "恢复城市运动",
  "Pause reactor motion": "暂停反应堆运动",
  "Resume reactor motion": "恢复反应堆运动",
  "Pause reaction": "暂停反应",
  "Resume reaction": "恢复反应",
  "Pause rotation": "暂停旋转",
  "Resume rotation": "恢复旋转",
  "Pause motion": "暂停运动",
  "Motion paused": "运动已暂停",
  "PROTONS": "质子",
  "NEUTRONS": "中子",
  "URANIUM": "铀",
  "NUCLEAR": "核",
  "POTENTIAL": "势能",

  // journey-navigation
  "Journey chapters": "旅程章节",
  "Language": "语言",

  // nucleus-fallback
  "Static conceptual fission model: barium-141, krypton-92 and three free neutrons.":
    "静态示意裂变模型：钡-141、氪-92 与三个自由中子。",
  "Static conceptual model of a uranium-235 nucleus: 92 protons and 143 neutrons.":
    "铀-235 原子核的静态示意模型：92 个质子与 143 个中子。",

  // power-controls
  "Explore the energy journey": "探索能量旅程",
  "Enter the control room": "进入主控室",
  "Control room": "主控室",
  "Enter & explore ↗": "进入并探索 ↗",
  "Explore the illuminated city": "探索亮灯的城市",
  "Home": "住宅",
  "Hospital": "医院",
  "Neighborhood": "街区",
  "City camera": "城市视角",
  "Zoom out of the city": "缩小城市视图",
  "Zoom level": "缩放级别",
  "Zoom in on the city": "放大城市视图",
  "Reset view": "重置视图",
  "Scroll to zoom · Drag to explore": "滚轮缩放 · 拖拽探索",
  "Use the mouse wheel or pinch to zoom. Drag to move around the city. With the scene focused, use arrow keys to pan, plus and minus to zoom, and Home to reset.":
    "用滚轮或双指缩放，拖拽可在城市中移动。场景获得焦点后，可用方向键平移、加号/减号缩放、Home 键重置。",
  "Return to the energy journey": "返回能量旅程",
  "PEOPLE / SYSTEMS / OVERSIGHT": "人员 / 系统 / 监督",
  "Inside the": "走进",
  "control room.": "主控室。",
  "Behind the technology, people. Trained teams monitor the plant, follow procedures and oversee its systems.":
    "技术背后是人。训练有素的团队监视电站运行、执行规程并管理各个系统。",
  "Observe": "观察",
  "The wall brings the plant’s separate systems into one view.":
    "大屏把电站相互独立的系统汇聚成一览。",
  "Understand": "研判",
  "Workstations help operators review conditions and coordinate their work.":
    "操作员在工作站上研判工况、协同工作。",
  "Return to the landscape": "返回全景",
  "Illustrative room and displays. No live data or operating controls.":
    "主控室与屏幕均为示意，不含实时数据或操作控制。",
  "Your journey is preserved. Press Esc to return.":
    "你的旅程进度已保留，按 Esc 返回。",
  "Return to reactor": "返回反应堆",
  "FROM A SINGLE ATOM TO AN ENTIRE CITY": "从一个原子，到一整座城市",
  "From": "从",
  "nuclear energy": "核能",
  "to ": "到",
  "everyday life.": "日常生活。",
  "Follow the heat.": "跟随热量。",
  "Follow the steam.": "跟随蒸汽。",
  "Back to heat transfer.": "回到换热。",
  "A controlled chain reaction creates heat. Heat becomes electricity. Electricity powers homes, hospitals and everyday life.":
    "可控链式反应产生热量，热量转化为电能，电能为住宅、医院和日常生活供电。",
  "Pressurized primary water carries heat out of the reactor. Follow its sealed pipe to the steam generator.":
    "高压一回路水把热量带出反应堆。沿着这条封闭管道，来到蒸汽发生器。",
  "A separate circuit begins here. Steam leaves the steam generator through the secondary line and expands through the turbine, turning its blades.":
    "独立的二回路从这里开始。蒸汽离开蒸汽发生器，沿二回路管道进入汽轮机膨胀做功，推动叶片旋转。",
  "Follow the secondary line back to its heat source. We are retracing the camera's route; steam flow does not reverse.":
    "沿二回路管道回溯热源。这是镜头在回程，蒸汽的流向并未反转。",
  "Primary: liquid inside the tubes.": "一回路：管内是高压水。",
  "Secondary: separate water around the tubes, becoming steam.":
    "二回路：管外是另一路水，正在化为蒸汽。",
  "Only secondary steam reaches the turbine. Primary water remains in its own sealed circuit.":
    "只有二回路的蒸汽进入汽轮机；一回路水始终留在自己的封闭回路中。",
  "The blades turn a shaft. That motion drives the generator; the turbine does not store electricity.":
    "叶片带动转轴旋转，驱动发电机工作；汽轮机本身并不储存电能。",
  "From the smallest of things, a world of possibilities.":
    "始至微末之物，终成万千气象。",
  "Project and creator": "项目与作者",
  "Continue to turbine": "继续：前往汽轮机",
  "Continue to generator": "继续：前往发电机",
  "PRIMARY WATER": "一回路水",
  "HEAT TRANSFER": "换热",
  "MOTION": "运动",
  "ELECTRICITY": "电能",
  "RETURNING TO HEAT TRANSFER": "正在返回换热段",
  "SECONDARY STEAM": "二回路蒸汽",
  "TURBINE": "汽轮机",
  "Replay this phase": "重播本阶段",
  "HEAT": "热",
  "LIGHT": "光",
  "Skip to turbine": "跳到汽轮机",
  "Skip to heat transfer": "跳到换热段",
  "Back to heat transfer": "返回换热段",
  "Replay this route": "重播本路线",
  "Overview": "总览",
  "Skip to illuminated city": "跳到亮灯的城市",
  "Conceptual · not to scale. Flow, speed and output are illustrative.":
    "示意图 · 不按比例。流量、速度与出力均为示意。",
  "Ancillary systems omitted. Primary water stays in its own circuit.":
    "辅助系统未画出。一回路水始终留在自己的回路中。",

  // power-fallback
  "Conceptual control room with a wall of plant schematics and two operator workstations. Illustrative displays, no live data.":
    "示意主控室：一整面电站系统图大屏与两个操作员工位。屏幕内容为示意，无实时数据。",
  "Conceptual energy journey: separate primary and steam circuits, a turbine shaft driving a generator, transmission lines and a lit city.":
    "示意能量旅程：相互独立的一回路与蒸汽回路、驱动发电机的汽轮机转轴、输电线路与亮灯的城市。",

  // reaction-controls
  "RELEASE TO CAPTURE": "松开即可俘获",
  "Send neutron into nucleus": "把中子射入原子核",
  "1 NEUTRON": "1 个中子",
  "DRAG / TAP": "拖拽 / 点击",
  "NEUTRON": "中子",
  "RELEASED": "已释放",
  "The first atom": "回到第一个原子",
  "Uranium 235 plus one neutron forms excited uranium 236, then barium 141, krypton 92, three neutrons and energy":
    "铀-235 俘获一个中子形成激发态铀-236，随后分裂为钡-141、氪-92、三个中子并释放能量",
  "energy": "能量",
  "Inside the reactor": "进入反应堆",
  "Replay reaction": "重播反应",
  "Conceptual · not to scale": "示意图 · 不按比例",
  "One possible channel. Light and trails are illustrative; most energy becomes fragment motion.":
    "这只是可能的分裂通道之一。光效与轨迹均为示意；大部分能量转化为碎片的动能。",
  "Barium-141": "钡-141",
  "Krypton-92": "氪-92",

  // reactor-controls
  "Explore the reactor": "探索反应堆",
  "Reactor camera": "反应堆视角",
  "Zoom out of the reactor": "缩小反应堆视图",
  "Zoom in on the reactor": "放大反应堆视图",
  "Scroll / pinch to zoom · Drag to explore": "滚轮/双指缩放 · 拖拽探索",
  "Use the mouse wheel or pinch to zoom. Drag to explore the reactor. With the scene focused, use arrow keys to pan, plus and minus to zoom, and Home to reset.":
    "用滚轮或双指缩放，拖拽以探索反应堆。场景获得焦点后，可用方向键平移、加号/减号缩放、Home 键重置。",
  "Return to fission": "返回裂变",
  "Follow the coolant": "跟随冷却剂",
  "Power the city": "为城市供电",
  "Replay this view": "重播本视图",
  "PELLET": "芯块",
  "CORE": "堆芯",
  "Conceptual · not to scale. Cut surfaces reveal the interior.":
    "示意图 · 不按比例。剖切面用于展示内部结构。",
  "Flow, heat and component counts are illustrative.":
    "流量、热量与部件数量均为示意。",
  "This is a change of scale, not a transformation of fission products.":
    "这只是尺度上的切换，裂变产物并未发生转变。",
  "Scientific reference: U.S. NRC": "科学参考：美国 NRC",

  // chain-dialog 链式反应演示
  "Chain reaction": "链式反应",
  "Each fission releases 2–3 neutrons that can trigger further fissions. Insert the control rods so that, on average, each fission causes exactly one new fission (k ≈ 1). That balance — criticality — is how a reactor sustains steady heat.":
    "每次裂变放出 2–3 个中子，它们可以再引发新的裂变。调整控制棒的插入深度，让平均每次裂变恰好引发一次新裂变（k ≈ 1）——这个平衡点就是临界，反应堆借此持续稳定地释放热量。",
  "Close chain reaction demo": "关闭链式反应演示",
  "Control rod insertion": "控制棒插入深度",
  "Start": "开始",
  "Generation": "代数",
  "Fissions": "累计裂变",
  "Free neutrons": "自由中子",
  "Supercritical · rapid growth": "超临界 · 剧烈增长",
  "Critical · steady release": "临界 · 稳定放热",
  "Subcritical · the chain dies out": "次临界 · 链式反应熄灭",
  "Animated diagram: uranium nuclei in a vessel; neutrons cause fissions or are absorbed by control rods.":
    "动态示意图：容器中的铀原子核；中子引发裂变，或被控制棒吸收。",
  "All fuel nuclei have fissioned.": "全部燃料核都已裂变。",
  "No free neutrons remain — the chain has stopped.": "已无自由中子——链式反应停止。",
  "Illustrative demonstration · not a physical simulation. Fuel quantity, speeds and probabilities are simplified.":
    "示意演示 · 非物理仿真。燃料数量、速度与概率均已简化。",
  "Uranium-235 nucleus": "铀-235 原子核",
  "Neutron": "中子",
  "Fission fragments": "裂变碎片",
  "Control rod": "控制棒",

  // science-dialog 增补
  "By the numbers": "关键数字",
  "Energy per fission": "每次裂变的能量",
  "≈ 200 MeV (≈ 3.2×10⁻¹¹ J) — hundreds of millions of times the energy of a chemical bond.":
    "≈ 200 MeV（≈ 3.2×10⁻¹¹ J），约为化学键能量的上亿倍。",
  "Mass into energy": "质量转化为能量",
  "E = mc²: when 1 kg of uranium-235 fissions completely, about 1 gram of mass becomes energy — roughly 2,500 tonnes of coal.":
    "E = mc²：1 kg 铀-235 全部裂变时，约有 1 克质量转化为能量——大约相当于 2500 吨标准煤。",
  "The fission fragments are unstable: barium-141 (half-life about 18 minutes) and krypton-92 keep decaying through beta emission into longer chains — the origin of spent fuel's radioactivity.":
    "裂变碎片并不稳定：钡-141（半衰期约 18 分钟）和氪-92 会继续发生 β 衰变、形成更长的衰变链——乏燃料的放射性正来源于此。",
  "Next: fusion. Light nuclei release even more energy per kilogram when they combine — the other end of the binding-energy curve. The Sun runs on fusion, and tokamaks such as China's EAST are pursuing it on Earth.":
    "下一站：聚变。轻核结合时每千克释放的能量更多——那是结合能曲线的另一端。太阳的能量来自聚变，中国的 EAST 全超导托卡马克等装置正在地球上探索这条路线。",
  "References: U.S. NRC (chain reaction, PWR circuits) · U.S. EIA (electricity generation). Citation does not imply endorsement.":
    "资料参考：美国 NRC（链式反应、压水堆回路）· 美国 EIA（发电）。引用不构成认可。",

  // reactor-fallback
  "Conceptual PWR cutaway: fuel rods and control rods inside a steel vessel, with primary water flowing down around the core and up through it.":
    "压水反应堆示意剖面：钢制压力容器内的燃料棒与控制棒，一回路水沿堆芯外围下降、再自下而上穿过堆芯。",

  // science-dialog
  "Close about the experience": "关闭关于本体验的说明",
  "Nuclear Power Plant / Chapter 01": "核电站原理 / 第一章",
  "INTERACTIVE": "交互演示",
  "A world within.": "方寸之间，别有世界。",
  "A world ahead.": "前路自有光明。",
  "From a single atom to an entire city — an exploration of the science behind nuclear energy. This first chapter begins with the nucleus of uranium-235.":
    "从一个原子到一整座城市——一次对核能科学的探索。第一章从铀-235 的原子核开始。",
  "Its 92 protons define it as uranium. Add 143 neutrons and you have 235 nucleons, giving this isotope its name.":
    "92 个质子决定了它是铀；再加上 143 个中子，共 235 个核子——这个同位素因此得名。",
  "This is a conceptual model, not a physical simulation. Colors identify particle types; positions, sizes, spacing, and motion are illustrative. The ambient motes are atmosphere, not emitted particles. Electrons are outside this view.":
    "这是一个概念模型，不是物理仿真。颜色用于区分粒子种类；位置、大小、间距与运动均为示意。环境中的悬浮微粒是氛围效果，并非放射出的粒子。电子不在本视图范围内。",
  "An independent educational and artistic project. This simplified experience is not engineering guidance, a safety analysis or reactor-operator training. Source links do not imply endorsement by the cited organizations.":
    "这是一个独立的教育与艺术项目。本简化体验不是工程指导、安全分析或反应堆操作员培训；资料链接也不代表被引用机构的认可或背书。",
  "Sound sources & CC0 licenses": "声音来源与 CC0 许可",
};

// --- Chapter labels ---------------------------------------------------------

export const ZH_JOURNEY_CHAPTERS = ["原子", "裂变", "反应堆", "城市"] as const;

// --- Opening particle descriptions ------------------------------------------

export const ZH_OPENING_DESCRIPTIONS: Record<
  ParticleFilter,
  { copy: string }
> = {
  all: {
    copy: "235 个粒子由核力束缚在一起。我们的故事从这里开始。",
  },
  proton: {
    copy: "每个质子带有一个单位的正电荷。质子数决定元素种类：92 个质子，意味着铀。",
  },
  neutron: {
    copy: "中子不带电。它与 92 个质子一起，构成这个同位素的质量数：235。",
  },
};

// --- Fission chapter copy ----------------------------------------------------

export const ZH_REACTION_COPY: Record<
  string,
  { label: string; title: readonly [string, string]; detail: string }
> = {
  ready: {
    label: "01 / 相遇",
    title: ["一次小小的", "到来。"],
    detail: "把中子拖入原子核，或点击它开始反应。",
  },
  absorbing: {
    label: "02 / 俘获",
    title: ["接触的", "一瞬间。"],
    detail: "铀-235 俘获一个中子。",
  },
  excited: {
    label: "03 / 激发",
    title: ["难以承受的", "过剩能量。"],
    detail: "在短暂的一瞬间，形成激发态的铀-236 原子核。",
  },
  splitting: {
    label: "04 / 裂变",
    title: ["释放出的", "力量。"],
    detail: "在核裂变中，原子核一分为二，释放出中子和巨大的能量。",
  },
  complete: {
    label: "04 / 裂变",
    title: ["释放出的", "力量。"],
    detail: "在核裂变中，原子核一分为二，释放出中子和巨大的能量。",
  },
  rewinding: {
    label: "重播",
    title: ["释放出的", "力量。"],
    detail: "正在回到本段演示的起点。",
  },
};

// --- Reactor chapter copy ----------------------------------------------------

export const ZH_REACTOR_CHAPTERS: Record<
  ReactorStage,
  { number: string; title: string; text: string }
> = {
  pellet: {
    number: "01 / 燃料芯块",
    title: "一次裂变，\n一个更大的世界。",
    text: "我们正在切换尺度。裂变发生在陶瓷二氧化铀芯块之内。",
  },
  rod: {
    number: "02 / 燃料棒",
    title: "重复发生的\n故事。",
    text: "芯块叠装在密封的金属包壳管中组成燃料棒，燃料棒再组装成燃料组件。",
  },
  core: {
    number: "03 / 堆芯",
    title: "一个\n全新的视角。",
    text: "燃料、中子吸收体与循环流动的水，一同容纳在钢制压力容器内。",
  },
  ready: {
    number: "03 — 反应堆",
    title: "反应堆\n内部。",
    text: "极端的工况。\n非凡的使命。\n近距离看看裂变的热量\n如何开启一段更宏大的旅程。",
  },
};

export const ZH_REACTOR_PARTS = {
  fuel: {
    ...REACTOR_PARTS.fuel,
    label: "燃料棒",
    title: "热量从这里开始。",
    description:
      "一根单独取出、供观察的代表性燃料棒。陶瓷二氧化铀芯块封装在密封的金属包壳内，芯块中的裂变释放热量。",
    detail: "燃料芯块 · 金属包壳",
    note: "放大展示的讲解剖面。运行期间燃料棒始终保持密封。",
  },
  control: {
    ...REACTOR_PARTS.control,
    label: "控制棒",
    title: "更平缓的反应。",
    description:
      "控制棒吸收中子。图中自上方插入一小段，展示吸收体进入堆芯更深处。被俘获的中子无法继续引发裂变。",
    detail: "中子吸收",
    note: "棒的移动与中子路径均为示意，未模拟反应堆功率或响应。",
  },
  coolant: {
    ...REACTOR_PARTS.coolant,
    label: "冷却剂",
    title: "热量被带走了。",
    description:
      "高压水在堆芯内向上流动时保持液态，并将热量带走。一回路在蒸汽发生器中把热量传递给另一个独立的水回路；一回路冷却剂不会进入汽轮机。高压水同时充当慢化剂——把裂变产生的快中子慢化，使其更容易引发下一次裂变。",
    detail: "一回路冷却剂出口",
    note: "高压液态水 · 独立的一回路。",
  },
};

export const ZH_REACTOR_HOTSPOT_NOTES = {
  fuel: "铀燃料通过裂变产生热量",
  control: "吸收中子，调节反应速率",
  coolant: "高压水把热量带入独立回路",
} as const;

export const ZH_REACTOR_ANNOTATIONS = {
  "Reactor vessel": {
    label: "反应堆压力容器",
    detail: "在高压下包容堆芯",
  },
  "Steam generator": {
    label: "蒸汽发生器",
    detail: "热量在相互独立的回路间传递",
  },
  "Secondary circuit": {
    label: "二回路",
    detail: "蒸汽流出 · 给水流入",
  },
} as const;

// --- Power chapter copy ------------------------------------------------------

export const ZH_POWER_PARTS = {
  heat: {
    ...POWER_PARTS.heat,
    label: "蒸汽 / 换热",
    title: "热量穿过边界，\n水各自分开。",
    description:
      "在蒸汽发生器中，高温一回路水通过金属管壁把热量传给另一路独立的水。这路水化为蒸汽，两回路的水互不混合。",
    sourceLabel: "美国 NRC",
  },
  turbine: {
    ...POWER_PARTS.turbine,
    label: "汽轮机",
    title: "热能化作\n运动。",
    description:
      "膨胀的蒸汽推动汽轮机叶片和转轴旋转。随后蒸汽冷凝为水，返回蒸汽发生器。汽轮机把能量转化为机械运动，并不储存电能。",
    sourceLabel: "美国 EIA",
  },
  generator: {
    ...POWER_PARTS.generator,
    label: "发电机",
    title: "运动化作\n电能。",
    description:
      "同一根转轴带动发电机转子旋转。转子变化的磁场在定子线圈中感应出电流，把机械能转化为电能。",
    sourceLabel: "美国 EIA",
  },
  transmission: {
    ...POWER_PARTS.transmission,
    label: "输电",
    title: "跨越距离的\n连接。",
    description:
      "变压器升高电压用于远距离输电；输电线把电能送往各地，变电站再降低电压分配给用户。蓝色脉冲表示连接关系，并非单个电子的运动。",
    sourceLabel: "美国 EIA",
  },
  city: {
    ...POWER_PARTS.city,
    label: "城市的回应",
    title: "被点亮的\n世界。",
    description:
      "家里的一盏灯，运转中的医院，连接你我的街道。电能支撑着日常生活与重要的公共服务。这座城市展示的正是这种连接——一个原子点不亮一座城。",
    sourceLabel: "美国 EIA",
  },
};

export const ZH_CITY_PLACES = {
  home: {
    ...CITY_PLACES.home,
    label: "家中的一盏灯",
    description:
      "一个寻常的夜晚：一顿晚餐、一次交谈、一盏没关的灯。电，融入了日常生活。",
  },
  hospital: {
    ...CITY_PLACES.hospital,
    label: "全天候的守护",
    description:
      "电能支撑着照明、医疗设备和基本公共服务。这所医院代表着一个社区所依赖的公共基础设施。",
  },
};

export const ZH_SOURCE_PREFIX = "科学参考：";
export const ZH_MOVING_TO = (chapter: string) => `正在前往「${chapter}」。`;
export const ZH_CHAPTER_OF = (chapter: string, index: number) =>
  `「${chapter}」，第 ${index} / 4 章。`;
