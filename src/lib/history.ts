// Bilingual milestones for the nuclear-power history timeline.
// region "world" | "china" | "shenzhen"; zh/en copy displayed per language.

export type ImageAsset = {
  src: string;
  altEn: string;
  altZh: string;
  creditEn: string;
  creditZh: string;
};

export type HistoryEntry = {
  year: string;
  region: "world" | "china" | "shenzhen";
  generation: 1 | 2 | 3 | 4;
  en: string;
  zh: string;
  image?: ImageAsset;
};

export type GenerationBand = {
  label: string;
  labelZh: string;
  span: string;
  en: string;
  zh: string;
};

export const GENERATION_BANDS: GenerationBand[] = [
  {
    label: "Gen I",
    labelZh: "一代",
    span: "1950s–60s",
    en: "Prototype reactors proving the technology.",
    zh: "原型示范堆，验证技术可行性。",
  },
  {
    label: "Gen II",
    labelZh: "二代",
    span: "1970s–90s",
    en: "Commercial PWR & BWR fleets — the type this site shows.",
    zh: "商用压水堆/沸水堆批量建设——本项目第三章演示的堆型。",
  },
  {
    label: "Gen III",
    labelZh: "三代",
    span: "2000s+",
    en: "Advanced passive safety: AP1000, EPR, Hualong One.",
    zh: "先进非能动安全设计：AP1000、EPR、华龙一号。",
  },
  {
    label: "Gen IV",
    labelZh: "四代",
    span: "2030s+",
    en: "Six concepts under development — see Frontier.",
    zh: "六种候选堆型在研——见「前沿」。",
  },
];

export const HISTORY_ENTRIES: HistoryEntry[] = [
  {
    year: "1942",
    region: "world",
    generation: 1,
    en: "Chicago Pile-1 achieves the first controlled chain reaction.",
    zh: "芝加哥 1 号堆实现人类首次可控链式反应。",
    image: {
      src: "/images/history/cp1.jpg",
      altEn: "Drawing of Chicago Pile-1, a tall lattice of graphite and uranium",
      altZh: "芝加哥 1 号堆建造示意图，石墨与铀砌成的巨型格栅",
      creditEn: "Argonne National Laboratory (U.S. DOE)",
      creditZh: "美国阿贡国家实验室",
    },
  },
  {
    year: "1951",
    region: "world",
    generation: 1,
    en: "EBR-1 lights four bulbs — the first electricity from fission.",
    zh: "EBR-1 点亮四只灯泡，核裂变第一次发出电来。",
  },
  {
    year: "1954",
    region: "world",
    generation: 1,
    en: "Obninsk (USSR) becomes the first grid-connected nuclear plant, 5 MWe.",
    zh: "苏联奥布宁斯克核电站并网，世界首座（5 兆瓦）。",
  },
  {
    year: "1955",
    region: "china",
    generation: 1,
    en: "China resolves to build its atomic-energy industry.",
    zh: "中国决定发展原子能事业。",
  },
  {
    year: "1957",
    region: "world",
    generation: 1,
    en: "Shippingport (US), the first full-scale commercial nuclear plant.",
    zh: "美国希平港电站投运，首座商用规模核电站。",
  },
  {
    year: "1970",
    region: "china",
    generation: 1,
    en: "China's submarine reactor on land makes its first nuclear electricity.",
    zh: "中国核潜艇陆上模式堆首次核能发电。",
  },
  {
    year: "1985",
    region: "china",
    generation: 2,
    en: "Qinshan Phase I begins construction — designed in China, 300 MWe.",
    zh: "秦山一期开工，中国自行设计，30 万千瓦。",
  },
  {
    year: "1991",
    region: "china",
    generation: 2,
    en: "Qinshan connects to the grid — mainland nuclear power starts here. China becomes the 7th nation to build its own NPP.",
    zh: "秦山并网，中国大陆核电零的突破，中国成为世界第七个自行设计建造核电站的国家。",
    image: {
      src: "/images/history/qinshan.jpg",
      altEn: "Aerial view of the Qinshan nuclear power base, Zhejiang",
      altZh: "浙江秦山核电基地航拍",
      creditEn: "Xinhua Net",
      creditZh: "新华网",
    },
  },
  {
    year: "1994",
    region: "shenzhen",
    generation: 2,
    en: "Daya Bay NPP enters commercial operation — mainland China's first large commercial plant, right here in Shenzhen, powering both Shenzhen and Hong Kong.",
    zh: "大亚湾核电站商运——中国大陆首座大型商用核电站，就在深圳，向深圳与香港供电。",
    image: {
      src: "/images/history/dayawan.jpg",
      altEn: "Aerial view of Daya Bay Nuclear Power Station by the sea",
      altZh: "大亚湾核电站海边航拍全景",
      creditEn: "Daya Bay Nuclear Power Operations (via Jingbao)",
      creditZh: "晶报 · 大亚湾核电供图",
    },
  },
  {
    year: "2000",
    region: "china",
    generation: 2,
    en: "Chashma NPP, built by China, connects to the grid in Pakistan.",
    zh: "中国承建的巴基斯坦恰希玛核电站并网。",
  },
  {
    year: "2012",
    region: "china",
    generation: 4,
    en: "Shidaowan high-temperature gas-cooled reactor begins construction — the world's first Gen-IV demonstration.",
    zh: "石岛湾高温气冷堆开工，全球首座四代示范堆。",
  },
  {
    year: "2015",
    region: "china",
    generation: 3,
    en: "Hualong One (Fuqing 5) starts construction — China's Gen-III flagship.",
    zh: "华龙一号福清 5 号开工，中国自主三代核电全球首堆。",
  },
  {
    year: "2021",
    region: "china",
    generation: 3,
    en: "Hualong One enters commercial operation.",
    zh: "华龙一号投入商运。",
    image: {
      src: "/images/history/hualong.jpg",
      altEn: "Drone view of the Hualong One global first reactor at Fuqing",
      altZh: "无人机拍摄的华龙一号全球首堆（福清）外景",
      creditEn: "Fuqing Nuclear Power Co. via Xinhua",
      creditZh: "新华社发（福建福清核电有限公司供图）",
    },
  },
  {
    year: "2023",
    region: "china",
    generation: 4,
    en: "Shidaowan HTGR goes commercial — a world first for Generation IV.",
    zh: "石岛湾高温气冷堆商运，四代核电全球首例。",
    image: {
      src: "/images/history/shidao.jpg",
      altEn: "Shidaowan HTGR demonstration plant in Rongcheng, Shandong",
      altZh: "山东荣成石岛湾高温气冷堆示范工程厂区",
      creditEn: "SASAC of China",
      creditZh: "国务院国资委网站",
    },
  },
  {
    year: "2025",
    region: "china",
    generation: 4,
    en: "112 units operating or under construction, ≈125 GW — the world's largest nuclear program.",
    zh: "中国在运在建核电机组 112 台、约 1.25 亿千瓦，规模世界第一。",
  },
];
