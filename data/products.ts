import { Category, Product } from "@/lib/types";

export const categories: Category[] = [
  "Phones",
  "Laptops",
  "Gaming",
  "Audio",
  "Wearables",
  "Accessories",
];

export const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "LG",
  "Microsoft",
  "Dell",
  "Anker",
];

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 16 Pro",
    brand: "Apple",
    category: "Phones",
    price: 1199,
    slug: "iphone-16-pro",
    description:
      "Titanium design. A18 Pro chip. The most advanced iPhone camera system ever. Built for those who demand the extraordinary.",
    specs: {
      Display: '6.3" Super Retina XDR',
      Chip: "A18 Pro",
      Storage: "256GB",
      Camera: "48MP Fusion + 48MP Ultra Wide",
      Battery: "Up to 33 hours video playback",
    },
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1723207156276-0d0a0b0a0b0a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592286927505-4d9fb02d9f98?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "natural", label: "Natural Titanium" },
      { id: "black", label: "Black Titanium", priceModifier: 0 },
      { id: "white", label: "White Titanium", priceModifier: 0 },
      { id: "512", label: "512GB", priceModifier: 200 },
    ],
    isNew: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S25",
    brand: "Samsung",
    category: "Phones",
    price: 999,
    slug: "samsung-galaxy-s25",
    description:
      "Galaxy AI reimagined. Snapdragon 8 Elite. Pro-grade camera with 200MP sensor. The flagship experience, refined.",
    specs: {
      Display: '6.2" Dynamic AMOLED 2X',
      Chip: "Snapdragon 8 Elite",
      Storage: "256GB",
      Camera: "200MP Wide + 50MP Telephoto",
      Battery: "4000mAh",
    },
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1565849902261-62612be79116?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b17351f76a8?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "phantom", label: "Phantom Black" },
      { id: "silver", label: "Silver Shadow" },
      { id: "512", label: "512GB", priceModifier: 120 },
    ],
    isNew: true,
    inStock: true,
  },
  {
    id: "3",
    name: "MacBook Pro M4",
    brand: "Apple",
    category: "Laptops",
    price: 1999,
    slug: "macbook-pro-m4",
    description:
      "The most advanced Mac laptops ever. M4 Pro chip. Stunning Liquid Retina XDR display. Up to 24 hours of battery life.",
    specs: {
      Display: '14.2" Liquid Retina XDR',
      Chip: "Apple M4 Pro",
      Memory: "18GB unified",
      Storage: "512GB SSD",
      Battery: "Up to 24 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1588878354571-c5a09e8f676a?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "14", label: '14"' },
      { id: "16", label: '16"', priceModifier: 400 },
      { id: "1tb", label: "1TB SSD", priceModifier: 200 },
    ],
    isNew: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Dell XPS 15",
    brand: "Dell",
    category: "Laptops",
    price: 1649,
    slug: "dell-xps-15",
    description:
      "InfinityEdge display. Intel Core Ultra processors. Precision-crafted aluminum chassis. Performance without compromise.",
    specs: {
      Display: '15.6" OLED 3.5K',
      Processor: "Intel Core Ultra 7",
      Memory: "32GB DDR5",
      Storage: "1TB NVMe SSD",
      Graphics: "NVIDIA RTX 4050",
    },
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac9145f2?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1588878354571-c5a09e8f676a?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "platinum", label: "Platinum Silver" },
      { id: "graphite", label: "Graphite" },
    ],
    inStock: true,
  },
  {
    id: "5",
    name: "PlayStation 5 Console",
    brand: "Sony",
    category: "Gaming",
    price: 499,
    slug: "ps5-console",
    description:
      "Experience lightning-fast loading with an ultra-high speed SSD. Stunning games with Ray Tracing. 4K gaming at 120fps.",
    specs: {
      CPU: "AMD Zen 2 8-core",
      GPU: "10.28 TFLOPS RDNA 2",
      Storage: "825GB SSD",
      Resolution: "Up to 8K",
      Audio: "Tempest 3D AudioTech",
    },
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1486401896238-9e4a20096d0f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85b1b78?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "standard", label: "Standard Edition" },
      { id: "digital", label: "Digital Edition", priceModifier: -100 },
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "PS5 DualSense Controller",
    brand: "Sony",
    category: "Gaming",
    price: 74,
    slug: "ps5-dualsense-controller",
    description:
      "Haptic feedback. Adaptive triggers. Built-in microphone. The most immersive controller ever created.",
    specs: {
      Connectivity: "Bluetooth, USB-C",
      Battery: "Up to 12 hours",
      Features: "Haptic feedback, adaptive triggers",
      Audio: "Built-in microphone array",
      Compatibility: "PS5, PC",
    },
    images: [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85b1b78?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1593305841991-05c298ba4575?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1486401896238-9e4a20096d0f?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "white", label: "White" },
      { id: "midnight", label: "Midnight Black" },
      { id: "cosmic", label: "Cosmic Red", priceModifier: 6 },
    ],
    inStock: true,
  },
  {
    id: "7",
    name: "Sony WH-1000XM6",
    brand: "Sony",
    category: "Audio",
    price: 399,
    slug: "sony-wh-1000xm6",
    description:
      "Industry-leading noise cancellation. Exceptional sound quality. 40-hour battery. The benchmark for premium headphones.",
    specs: {
      Driver: "30mm dynamic",
      ANC: "Dual Processor V2",
      Battery: "40 hours (ANC on)",
      Connectivity: "Bluetooth 5.3, LDAC",
      Weight: "250g",
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a10e6e084b46?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736bc3?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "black", label: "Black" },
      { id: "silver", label: "Silver" },
      { id: "midnight", label: "Midnight Blue" },
    ],
    isNew: true,
    inStock: true,
  },
  {
    id: "8",
    name: "AirPods Pro 2",
    brand: "Apple",
    category: "Audio",
    price: 249,
    slug: "airpods-pro-2",
    description:
      "Active Noise Cancellation. Adaptive Audio. Personalized Spatial Audio. The ultimate wireless earbud experience.",
    specs: {
      Driver: "Custom high-excursion",
      ANC: "Active Noise Cancellation",
      Battery: "6 hours (ANC on)",
      Case: "MagSafe charging",
      Chip: "H2",
    },
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "usb-c", label: "USB-C Case" },
      { id: "lightning", label: "Lightning Case", priceModifier: -10 },
    ],
    inStock: true,
  },
  {
    id: "9",
    name: "Apple Watch Series 10",
    brand: "Apple",
    category: "Wearables",
    price: 429,
    slug: "apple-watch-series-10",
    description:
      "Thinnest Apple Watch ever. Larger display. Faster charging. Advanced health sensors. Your essential companion.",
    specs: {
      Display: '1.9" Always-On Retina',
      Chip: "S10 SiP",
      Battery: "Up to 18 hours",
      Water: "50m water resistant",
      Health: "ECG, Blood Oxygen, Temperature",
    },
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544117765-31de0d1f5c8a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "42", label: "42mm" },
      { id: "46", label: "46mm", priceModifier: 30 },
      { id: "cellular", label: "GPS + Cellular", priceModifier: 100 },
    ],
    isNew: true,
    inStock: true,
  },
  {
    id: "10",
    name: "Samsung Galaxy Watch 7",
    brand: "Samsung",
    category: "Wearables",
    price: 299,
    slug: "samsung-galaxy-watch-7",
    description:
      "BioActive Sensor. Galaxy AI health insights. Sapphire crystal display. Premium design meets advanced wellness tracking.",
    specs: {
      Display: '1.5" Super AMOLED',
      Battery: "Up to 40 hours",
      Sensor: "BioActive Sensor",
      Water: "IP68 + 5ATM",
      OS: "Wear OS 5",
    },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1544117765-31de0d1f5c8a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "40", label: "40mm" },
      { id: "44", label: "44mm", priceModifier: 20 },
      { id: "lte", label: "LTE", priceModifier: 50 },
    ],
    inStock: true,
  },
  {
    id: "11",
    name: "MagSafe Charger",
    brand: "Apple",
    category: "Accessories",
    price: 39,
    slug: "magsafe-charger",
    description:
      "Perfectly aligned magnets attach to your iPhone. Delivers up to 15W of power. Compact, elegant, effortless.",
    specs: {
      Output: "Up to 15W",
      Compatibility: "iPhone 12 and later",
      Cable: "1m USB-C integrated",
      Diameter: "60mm",
      Weight: "113g",
    },
    images: [
      "https://images.unsplash.com/photo-1591291616183-aa0f0e0b0b0b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736bc3?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1609091839311-9ed94ce8f5d2?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=800&fit=crop",
    ],
    variants: [{ id: "standard", label: "Standard" }],
    inStock: true,
  },
  {
    id: "12",
    name: "Anker USB-C Hub",
    brand: "Anker",
    category: "Accessories",
    price: 79,
    slug: "anker-usb-c-hub",
    description:
      "7-in-1 connectivity hub. 4K HDMI, 100W Power Delivery, dual USB-A, SD/microSD slots. One cable, infinite possibilities.",
    specs: {
      Ports: "HDMI, 2x USB-A, USB-C PD, SD, microSD",
      HDMI: "4K@60Hz",
      Power: "100W PD pass-through",
      Material: "Aluminum unibody",
      Cable: "15cm braided",
    },
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1609091839311-9ed94ce8f5d2?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "silver", label: "Silver" },
      { id: "space", label: "Space Gray" },
    ],
    inStock: true,
  },
  {
    id: "13",
    name: "LG Gram 17",
    brand: "LG",
    category: "Laptops",
    price: 1799,
    slug: "lg-gram-17",
    description:
      "Remarkably light 17-inch laptop. Intel Core Ultra. All-day battery. For creators who refuse to compromise on screen real estate.",
    specs: {
      Display: '17" WQXGA IPS',
      Processor: "Intel Core Ultra 7",
      Memory: "16GB LPDDR5",
      Storage: "512GB SSD",
      Weight: "1.35kg",
    },
    images: [
      "https://images.unsplash.com/photo-1525547719571-a2d4ac9145f2?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1588878354571-c5a09e8f676a?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "obsidian", label: "Obsidian Black" },
      { id: "1tb", label: "1TB SSD", priceModifier: 150 },
    ],
    inStock: true,
  },
  {
    id: "14",
    name: "Xbox Series X",
    brand: "Microsoft",
    category: "Gaming",
    price: 499,
    slug: "xbox-series-x",
    description:
      "The fastest, most powerful Xbox ever. 12 teraflops of raw graphic processing power. True 4K gaming at 120fps.",
    specs: {
      CPU: "8-core AMD Zen 2",
      GPU: "12 TFLOPS RDNA 2",
      Storage: "1TB Custom NVMe SSD",
      Resolution: "Up to 8K",
      Features: "Quick Resume, Ray Tracing",
    },
    images: [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1486401896238-9e4a20096d0f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85b1b78?w=800&h=800&fit=crop",
    ],
    variants: [{ id: "standard", label: "Standard Edition" }],
    inStock: false,
  },
  {
    id: "15",
    name: "Surface Pro 11",
    brand: "Microsoft",
    category: "Laptops",
    price: 1299,
    slug: "surface-pro-11",
    description:
      "Snapdragon X Elite. All-day battery. Stunning PixelSense Flow display. The most versatile 2-in-1 for modern professionals.",
    specs: {
      Display: '13" PixelSense Flow',
      Chip: "Snapdragon X Elite",
      Memory: "16GB",
      Storage: "512GB SSD",
      Battery: "Up to 14 hours",
    },
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1588878354571-c5a09e8f676a?w=800&h=800&fit=crop",
    ],
    variants: [
      { id: "platinum", label: "Platinum" },
      { id: "black", label: "Black" },
      { id: "1tb", label: "1TB SSD", priceModifier: 200 },
    ],
    isNew: true,
    inStock: true,
  },
  {
    id: "16",
    name: "LG UltraFine 5K Display",
    brand: "LG",
    category: "Accessories",
    price: 1299,
    slug: "lg-ultrafine-5k",
    description:
      "27-inch 5K Retina display. P3 wide color gamut. Thunderbolt 3 connectivity. The reference monitor for creative professionals.",
    specs: {
      Display: '27" 5K IPS',
      Resolution: "5120 x 2880",
      Color: "99% P3",
      Connectivity: "Thunderbolt 3",
      Brightness: "500 nits",
    },
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop",
    ],
    variants: [{ id: "standard", label: "Standard" }],
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getRelatedProducts(
  product: Product,
  limit = 4
): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
