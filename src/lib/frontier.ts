// Bilingual cards for frontier nuclear applications.

export type FrontierCard = {
  id: string;
  icon: "smr" | "htgr" | "sfr" | "msr" | "fusion" | "multi";
  titleEn: string;
  titleZh: string;
  pointsEn: string[];
  pointsZh: string[];
  statusEn: string;
  statusZh: string;
};

export const FRONTIER_CARDS: FrontierCard[] = [
  {
    id: "smr",
    icon: "smr",
    titleEn: "Small Modular Reactors",
    titleZh: "小型模块化反应堆（SMR）",
    pointsEn: [
      "300 MWe or less, built in factories and assembled on site like building blocks.",
      "Over 80 designs registered with the IAEA.",
      "Power for remote regions, data centers, and industrial parks.",
    ],
    pointsZh: [
      "30 万千瓦以下，工厂预制、现场像搭积木一样拼装。",
      "国际原子能机构已登记 80 余种设计。",
      "为偏远地区、数据中心、工业园区供电供热。",
    ],
    statusEn: "Under construction worldwide",
    statusZh: "全球多国在建",
  },
  {
    id: "htgr",
    icon: "htgr",
    titleEn: "High-Temperature Gas-cooled Reactor",
    titleZh: "高温气冷堆",
    pointsEn: [
      "Helium coolant at 900–1000 °C — hot enough to make hydrogen.",
      "TRISO coated-particle fuel cannot melt down.",
      "Shidaowan (2023): the world's first Gen-IV plant in commercial service.",
    ],
    pointsZh: [
      "氦气冷却，出口温度 900–1000 ℃——高到可以直接制氢。",
      "全陶瓷包覆颗粒燃料，固有安全、不会熔毁。",
      "石岛湾 2023 年商运，全球首座四代核电站。",
    ],
    statusEn: "Commercial — Shidaowan, Shandong",
    statusZh: "已商运 —— 山东石岛湾",
  },
  {
    id: "sfr",
    icon: "sfr",
    titleEn: "Sodium-cooled Fast Reactor",
    titleZh: "钠冷快堆",
    pointsEn: [
      "Liquid metal sodium carries heat without pressurizing.",
      "Burns plutonium from spent fuel — a closed fuel cycle.",
      "China's demonstration: Xiapu, Fujian.",
    ],
    pointsZh: [
      "液态金属钠导热，一回路不需要高压。",
      "可燃烧乏燃料中的钚——闭式燃料循环。",
      "中国示范工程：福建霞浦。",
    ],
    statusEn: "Demonstration under construction",
    statusZh: "示范堆在建",
  },
  {
    id: "msr",
    icon: "msr",
    titleEn: "Molten Salt Reactor",
    titleZh: "熔盐堆",
    pointsEn: [
      "Fuel dissolved in liquid salt at ambient pressure.",
      "Can run on thorium, which China has in abundance.",
      "Experimental thorium MSR operating in Wuwei, Gansu.",
    ],
    pointsZh: [
      "燃料熔于液态盐中，常压运行。",
      "可用钍作燃料——中国钍资源丰富。",
      "甘肃武威 2 兆瓦液态燃料钍基熔盐实验堆已运行。",
    ],
    statusEn: "Experimental — Wuwei, Gansu",
    statusZh: "实验阶段 —— 甘肃武威",
  },
  {
    id: "fusion",
    icon: "fusion",
    titleEn: "Controlled Fusion",
    titleZh: "可控核聚变",
    pointsEn: [
      "Deuterium + tritium → helium + a neutron, releasing 17.6 MeV.",
      "EAST held 100 million °C for 1 066 seconds — a world record.",
      "Seawater-derived fuel, no long-lived waste. Try the demo below.",
    ],
    pointsZh: [
      "氘 + 氚 → 氦 + 中子，一次反应释放 17.6 兆电子伏。",
      "EAST「人造太阳」实现 1 亿℃ 1066 秒，世界纪录。",
      "燃料来自海水、无长寿命废物——下方试试演示。",
    ],
    statusEn: "Research — EAST (Hefei), ITER, BEST",
    statusZh: "研究阶段 —— EAST（合肥）、ITER、BEST",
  },
  {
    id: "multi",
    icon: "multi",
    titleEn: "Beyond Electricity",
    titleZh: "核能非电应用",
    pointsEn: [
      "Hydrogen production with high-temperature heat or electrolysis.",
      "District heating: Qinshan has warmed Haiyan since 2021.",
      "Desalination and industrial process heat.",
    ],
    pointsZh: [
      "高温供热或电解制氢。",
      "核能供暖：秦山 2021 年起为海盐全县供暖。",
      "海水淡化与工业工艺热。",
    ],
    statusEn: "Deploying now",
    statusZh: "正在落地",
  },
];
