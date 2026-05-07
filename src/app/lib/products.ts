
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  specs?: Record<string, string>;
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "FlowBook Pro",
    description: "The ultimate laptop for high-performance creative workflows and coding enthusiasts.",
    price: 1299.99,
    category: "Laptops",
    image: "https://picsum.photos/seed/101/600/400",
    specs: {
      "Processor": "M2 Pro Chip",
      "RAM": "16GB Unified Memory",
      "Storage": "512GB SSD",
      "Display": "14-inch Liquid Retina"
    }
  },
  {
    id: "prod-2",
    name: "AuraPhone 15",
    description: "A sleek, minimalist smartphone featuring our most advanced camera system and crystal clear display.",
    price: 899.00,
    category: "Phones",
    image: "https://picsum.photos/seed/102/600/400",
    specs: {
      "Camera": "48MP Main",
      "Battery": "All-day life",
      "Security": "Face ID",
      "Connectivity": "5G Ready"
    }
  },
  {
    id: "prod-3",
    name: "Horizon Watch X",
    description: "Stay connected and track your health with precision in a beautiful, titanium casing.",
    price: 399.00,
    category: "Wearables",
    image: "https://picsum.photos/seed/103/600/400",
    specs: {
      "Sensors": "ECG, Blood Oxygen",
      "Durability": "Water resistant 50m",
      "GPS": "Dual-frequency"
    }
  },
  {
    id: "prod-4",
    name: "ZenSound Wireless",
    description: "Immerse yourself in pure, high-fidelity sound with active noise cancellation and spatial audio.",
    price: 249.50,
    category: "Audio",
    image: "https://picsum.photos/seed/104/600/400",
    specs: {
      "Battery": "Up to 40 hours",
      "Cancellation": "Active Hybrid ANC",
      "Bluetooth": "5.3"
    }
  },
  {
    id: "prod-5",
    name: "FocusCam D7",
    description: "Capture professional-grade photos and videos with our latest full-frame mirrorless camera.",
    price: 1800.00,
    category: "Cameras",
    image: "https://picsum.photos/seed/105/600/400",
    specs: {
      "Sensor": "33MP Full-frame",
      "Video": "4K 60p",
      "Focus": "Real-time Tracking"
    }
  },
  {
    id: "prod-6",
    name: "Canvas Tab Ultra",
    description: "The most versatile tablet for artists and students alike, with precision stylus support.",
    price: 649.00,
    category: "Tablets",
    image: "https://picsum.photos/seed/106/600/400",
    specs: {
      "Display": "12.9-inch XDR",
      "Chip": "M1 Performance",
      "Accessories": "Pencil Support"
    }
  }
];
