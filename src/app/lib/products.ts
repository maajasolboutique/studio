
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  images?: string[];
  specs?: Record<string, string>;
  isHot?: boolean;
  isNew?: boolean;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  fabric: string;
}

export const products: Product[] = [
  {
    id: "jp-1",
    name: "Royal Pink Rajputi Poshak",
    description: "Exquisite hand-worked poshak with heavy Zardosi work, perfect for weddings and royal gatherings.",
    price: 14999,
    discountPrice: 12999,
    category: "Rajputi Poshak",
    image: "https://picsum.photos/seed/pink-poshak-1/600/800",
    stockStatus: 'In Stock',
    fabric: "Pure Satin Silk",
    isHot: true,
    specs: {
      "Work": "Hand Zardosi",
      "Style": "Traditional Rajputi",
      "Color": "Royal Pink",
      "Delivery": "7-10 Days"
    }
  },
  {
    id: "jp-2",
    name: "Bridal Red Heritage Poshak",
    description: "The quintessential bridal attire for a Rajputi wedding. Heavy Gota-Patti and stone work.",
    price: 24999,
    discountPrice: 19999,
    category: "Bridal Wear",
    image: "https://picsum.photos/seed/red-poshak-bridal/600/800",
    stockStatus: 'Limited Stock',
    fabric: "Thakurji Pure Georgette",
    isNew: true,
    specs: {
      "Work": "Stone & Gota Patti",
      "Occasion": "Bridal / Wedding",
      "Wash": "Dry Clean Only"
    }
  },
  {
    id: "jp-3",
    name: "Marigold Yellow Lehenga",
    description: "Bright and vibrant lehenga with contemporary motifs, ideal for haldi or festival celebrations.",
    price: 8999,
    category: "Lehenga",
    image: "https://picsum.photos/seed/yellow-lehenga-haldi/600/800",
    stockStatus: 'In Stock',
    fabric: "Semi-Pure Crepe",
    specs: {
      "Style": "A-Line",
      "Color": "Mustard Yellow"
    }
  },
  {
    id: "jp-4",
    name: "Emerald Green Satin Poshak",
    description: "Classic satin poshak with elegant silver embroidery. Comfortable and regal.",
    price: 11999,
    category: "Rajputi Poshak",
    image: "https://picsum.photos/seed/green-poshak/600/800",
    stockStatus: 'In Stock',
    fabric: "Satin",
    specs: {
      "Work": "Silver Tilla",
      "Color": "Emerald Green"
    }
  },
  {
    id: "jp-5",
    name: "Golden Handcrafted Odhni",
    description: "Premium handcrafted odhni with heavy borders and fine sequence work.",
    price: 3499,
    category: "Dupatta",
    image: "https://picsum.photos/seed/gold-odhni/600/800",
    stockStatus: 'In Stock',
    fabric: "Chiffon",
    specs: {
      "Length": "2.5 Meters",
      "Work": "Kiran & Border Work"
    }
  },
  {
    id: "jp-6",
    name: "Baby Pink Kids Poshak",
    description: "Adorable traditional poshak for little princesses. Light weight and skin friendly.",
    price: 2999,
    category: "Kids Rajputi Wear",
    image: "https://picsum.photos/seed/kids-pink-poshak/600/800",
    stockStatus: 'In Stock',
    fabric: "Cotton Silk",
    specs: {
      "Age Group": "2-12 Years",
      "Comfort": "High"
    }
  },
  {
    id: "jp-7",
    name: "Midnight Blue Velvet Saree",
    description: "Luxurious velvet saree with antique gold border. Perfect for evening royal parties.",
    price: 7499,
    category: "Saree",
    image: "https://picsum.photos/seed/blue-velvet-saree/600/800",
    stockStatus: 'In Stock',
    fabric: "Micro Velvet",
    isHot: true,
    specs: {
      "Border": "Zari Work",
      "Color": "Midnight Blue"
    }
  },
  {
    id: "jp-8",
    name: "Temple Style Aad Jewellery",
    description: "Traditional Rajputi Aad set with matching earrings. 22K Gold plated with kundan stones.",
    price: 5999,
    category: "Jewellery",
    image: "https://picsum.photos/seed/rajputi-aad-jewel/600/800",
    stockStatus: 'In Stock',
    fabric: "Alloy / Gold Plated",
    specs: {
      "Type": "Necklace Set",
      "Style": "Rajasthani Aad"
    }
  },
  {
    id: "jp-9",
    name: "Turquoise Meenakari Poshak",
    description: "Unique turquoise poshak featuring delicate meenakari patterns and floral embroidery.",
    price: 13500,
    category: "Rajputi Poshak",
    image: "https://picsum.photos/seed/turquoise-poshak/600/800",
    stockStatus: 'In Stock',
    fabric: "Pure Satin",
    specs: {
      "Work": "Meenakari",
      "Color": "Turquoise"
    }
  },
  {
    id: "jp-10",
    name: "Champagne Gold Reception Lehenga",
    description: "Glittering gold lehenga for modern royalty. Fusion of traditional and contemporary design.",
    price: 18999,
    category: "Lehenga",
    image: "https://picsum.photos/seed/gold-reception-lehenga/600/800",
    stockStatus: 'Limited Stock',
    fabric: "Silk Blend",
    isNew: true,
    specs: {
      "Occasion": "Reception / Engagement",
      "Work": "Sequence & Pearl"
    }
  },
  {
    id: "jp-11",
    name: "Traditional Rajputi Bajuband",
    description: "Classic Bajuband with red and green stones. Essential Rajputi accessory.",
    price: 2199,
    category: "Jewellery",
    image: "https://picsum.photos/seed/rajputi-bajuband/600/800",
    stockStatus: 'In Stock',
    fabric: "Gold Plated",
    specs: {
      "Type": "Armlet",
      "Stone": "Kundan & Polki"
    }
  },
  {
    id: "jp-12",
    name: "White & Gold Festive Poshak",
    description: "Elegant white satin poshak with rich gold embroidery. Subtle and sophisticated.",
    price: 9999,
    category: "Rajputi Poshak",
    image: "https://picsum.photos/seed/white-gold-poshak/600/800",
    stockStatus: 'In Stock',
    fabric: "Satin Silk",
    specs: {
      "Color": "Off-White / Gold",
      "Season": "All Season"
    }
  },
  {
    id: "jp-13",
    name: "Heavy Designer Rajputi Odhni",
    description: "Odhni with heavy jaal work and scalloped borders. Multi-color embroidery.",
    price: 4999,
    category: "Dupatta",
    image: "https://picsum.photos/seed/heavy-jaal-odhni/600/800",
    stockStatus: 'In Stock',
    fabric: "Thakurji Pure",
    specs: {
      "Work": "Zari Jaal",
      "Transparency": "Semi-Sheer"
    }
  },
  {
    id: "jp-14",
    name: "Royal Blue Wedding Poshak",
    description: "Heavy wedding collection in royal blue. Intricate patterns and heavy dori work.",
    price: 21000,
    category: "Bridal Wear",
    image: "https://picsum.photos/seed/royal-blue-poshak/600/800",
    stockStatus: 'Limited Stock',
    fabric: "Pure Crepe",
    specs: {
      "Work": "Dori & Kundan",
      "Color": "Royal Blue"
    }
  },
  {
    id: "jp-15",
    name: "Light Peach Daily Wear Saree",
    description: "Simple yet elegant chiffon saree for daily boutique style. Breathable and chic.",
    price: 1999,
    category: "Saree",
    image: "https://picsum.photos/seed/peach-chiffon-saree/600/800",
    stockStatus: 'In Stock',
    fabric: "Chiffon",
    specs: {
      "Style": "Printed with Border",
      "Length": "6.3 Meters"
    }
  },
  {
    id: "jp-16",
    name: "Handmade Rajputi Rakhadi",
    description: "Traditional borla style rakhadi. Hand-set stones with gold plating.",
    price: 1599,
    category: "Jewellery",
    image: "https://picsum.photos/seed/rajputi-borla/600/800",
    stockStatus: 'In Stock',
    fabric: "Alloy",
    specs: {
      "Style": "Borla",
      "Attachment": "Adjustable String"
    }
  },
  {
    id: "jp-17",
    name: "Violet & Silver Lehenga",
    description: "Exquisite violet lehenga with silver gota-patti. A head-turner at any festival.",
    price: 10500,
    category: "Lehenga",
    image: "https://picsum.photos/seed/violet-lehenga/600/800",
    stockStatus: 'In Stock',
    fabric: "Raw Silk",
    specs: {
      "Color": "Deep Violet",
      "Work": "Gota Patti"
    }
  },
  {
    id: "jp-18",
    name: "Classic Red Bandhej Poshak",
    description: "Traditional Bandhej pattern with modern cut. Very popular choice for Teej.",
    price: 8500,
    category: "Rajputi Poshak",
    image: "https://picsum.photos/seed/red-bandhej/600/800",
    stockStatus: 'In Stock',
    fabric: "Georgette",
    specs: {
      "Pattern": "Bandhej",
      "Occasion": "Festivals"
    }
  },
  {
    id: "jp-19",
    name: "Mint Green Bridal Poshak",
    description: "Refreshing mint green poshak for a modern bride. Full heavy work on ghagra.",
    price: 27500,
    category: "Bridal Wear",
    image: "https://picsum.photos/seed/mint-green-bridal/600/800",
    stockStatus: 'Out of Stock',
    fabric: "Thakurji Pure",
    specs: {
      "Color": "Mint Green",
      "Weight": "3kg"
    }
  },
  {
    id: "jp-20",
    name: "Pink Zari Work Kids Lehenga",
    description: "Festive lehenga for girls. Soft lining for maximum comfort.",
    price: 3499,
    category: "Kids Rajputi Wear",
    image: "https://picsum.photos/seed/kids-zari-lehenga/600/800",
    stockStatus: 'In Stock',
    fabric: "Art Silk",
    specs: {
      "Size": "Small to Extra Large",
      "Type": "Semi-Stitched"
    }
  },
  {
    id: "jp-21",
    name: "Antique Silver Nath",
    description: "Elegant Rajputi Nath with pearl and red stone accents. Silver finish.",
    price: 899,
    category: "Jewellery",
    image: "https://picsum.photos/seed/rajputi-nath/600/800",
    stockStatus: 'In Stock',
    fabric: "Oxidized Silver",
    specs: {
      "Type": "Nose Ring",
      "Occasion": "Festive"
    }
  },
  {
    id: "jp-22",
    name: "Ruby Red Party Saree",
    description: "Stunning georgette saree with heavy sequence work blouse. Shahi andaz.",
    price: 4999,
    category: "Saree",
    image: "https://picsum.photos/seed/ruby-red-saree/600/800",
    stockStatus: 'In Stock',
    fabric: "Georgette",
    specs: {
      "Blouse": "Unstitched Heavy",
      "Color": "Ruby Red"
    }
  },
  {
    id: "jp-23",
    name: "Lemon Yellow Designer Poshak",
    description: "Pastel collection poshak. Light-weight work, suitable for summer weddings.",
    price: 11500,
    category: "Rajputi Poshak",
    image: "https://picsum.photos/seed/yellow-designer-poshak/600/800",
    stockStatus: 'In Stock',
    fabric: "Satin Silk",
    specs: {
      "Color": "Lemon Yellow",
      "Embroidery": "Floral Zari"
    }
  },
  {
    id: "jp-24",
    name: "Black Shimmer Rajputi Odhni",
    description: "Unique black odhni with golden shimmer. High-fashion traditional wear.",
    price: 2899,
    category: "Dupatta",
    image: "https://picsum.photos/seed/black-shimmer-odhni/600/800",
    stockStatus: 'In Stock',
    fabric: "Net with Shimmer",
    specs: {
      "Color": "Black / Gold",
      "Work": "Kiran Work"
    }
  },
  {
    id: "jp-25",
    name: "Traditional Rajputi Bajuband Set",
    description: "Set of 2 bajubands. Authentic Rajasthani design with loom strings.",
    price: 3800,
    category: "Jewellery",
    image: "https://picsum.photos/seed/rajputi-bajuband/600/800",
    stockStatus: 'In Stock',
    fabric: "Gold Plated Copper",
    specs: {
      "Type": "Traditional Armlet",
      "Count": "Pair of 2"
    }
  }
];
