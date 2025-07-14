// 商品数据集合

// 礼品盒系列1 - 展示各种功能
export const giftBoxProducts = [
  { 
    id: 1, 
    name: "Gift Box 1", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: false 
  },
  { 
    id: 2, 
    name: "Gift Box 2", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: false 
  },
  { 
    id: 3, 
    name: "Gift Box 3", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: false, 
    p1: "10% OFF", 
    p2: "LIMITED TIME" 
  },
  { 
    id: 4, 
    name: "Gift Box 4", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: false 
  },
  { 
    id: 5, 
    name: "Gift Box 5", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: false 
  },
  { 
    id: 6, 
    name: "Gift Box 6", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: false, 
    p1: "NEW ARRIVAL", 
    p2: "HOT SALE" 
  },
  { 
    id: 7, 
    name: "Gift Box 7", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: false 
  }
];

// 礼品盒系列2 - 专注折扣商品
export const giftBoxProductsNo2 = [
  { 
    id: 11, 
    name: "Premium Gift Box A", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: true, 
    p1: "50% OFF", 
    p2: "MEGA SALE" 
  },
  { 
    id: 12, 
    name: "Premium Gift Box B", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: true, 
    p1: "BUY 2 GET 1", 
    p2: "FREE" 
  },
  { 
    id: 13, 
    name: "Premium Gift Box C", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: true 
  },
  { 
    id: 14, 
    name: "Premium Gift Box D", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: true, 
    p1: "FLASH DEAL", 
    p2: "24H ONLY" 
  },
  { 
    id: 15, 
    name: "Premium Gift Box E", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: true 
  },
  { 
    id: 16, 
    name: "Premium Gift Box F", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: true, 
    p1: "CLEARANCE", 
    p2: "FINAL SALE" 
  }
];

// 特色商品系列 - 主打新品
export const featuredProducts = [
  { 
    id: 21, 
    name: "Special Edition Box 1", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: true, 
    p1: "LIMITED", 
    p2: "EDITION" 
  },
  { 
    id: 22, 
    name: "Special Edition Box 2", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: false 
  },
  { 
    id: 23, 
    name: "Special Edition Box 3", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: true, 
    p1: "EXCLUSIVE", 
    p2: "PREMIUM" 
  },
  { 
    id: 24, 
    name: "Special Edition Box 4", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: false 
  },
  { 
    id: 25, 
    name: "Special Edition Box 5", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: false 
  }
];

// 季节性商品 - 节日特供
export const seasonalProducts = [
  { 
    id: 31, 
    name: "Christmas Special", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: true, 
    p1: "XMAS SPECIAL", 
    p2: "25% OFF" 
  },
  { 
    id: 32, 
    name: "New Year Gift", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: false 
  },
  { 
    id: 33, 
    name: "Valentine Bundle", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: true, 
    p1: "LOVE BUNDLE", 
    p2: "SAVE 30%" 
  },
  { 
    id: 34, 
    name: "Easter Collection", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: false 
  },
  { 
    id: 35, 
    name: "Summer Vibes", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: true, 
    p1: "SUMMER", 
    p2: "REFRESH" 
  },
  { 
    id: 36, 
    name: "Halloween Mystery", 
    image: "/goods/box1.png", 
    otherDec: true, 
    mask: true, 
    p1: "MYSTERY", 
    p2: "BOX" 
  },
  { 
    id: 37, 
    name: "Black Friday Deal", 
    image: "/goods/box1.png", 
    otherDec: false, 
    mask: true, 
    p1: "BLACK FRIDAY", 
    p2: "70% OFF" 
  }
];

// 所有商品数据的索引
export const allProductCollections = {
  giftBoxProducts,
  giftBoxProductsNo2,
  featuredProducts,
  seasonalProducts
}; 