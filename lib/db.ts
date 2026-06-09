import fs from "fs";
import path from "path";
import os from "os";
import { products as seedProducts } from "@/data/products";
import { Database, HomepageFeatured, Order } from "@/lib/types";
import { createHistoryEntry, normalizeOrder } from "@/lib/order-utils";

const IS_VERCEL = process.env.VERCEL === "1";

function getDbPath(): string {
  if (IS_VERCEL) {
    return path.join(os.tmpdir(), "lumis-db.json");
  }
  return path.join(process.cwd(), "data", "db.json");
}

let memoryDb: Database | null = null;

function seedOrders(): Order[] {
  const base = (
    partial: Partial<Order> &
      Pick<
        Order,
        | "id"
        | "orderNumber"
        | "customerName"
        | "customerEmail"
        | "items"
        | "status"
        | "createdAt"
      >
  ): Order =>
    normalizeOrder({
      customerPhone: "",
      paymentStatus: partial.status === "cancelled" ? "refunded" : "paid",
      paymentMethod: "card",
      trackingNumber:
        partial.status === "shipped" || partial.status === "delivered"
          ? "1Z999AA10123456784"
          : "",
      notes: "",
      internalNotes: "",
      tax: 0,
      discount: 0,
      shippingAddress: {
        line1: "123 Market Street",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "United States",
      },
      history: [
        createHistoryEntry("Order placed", "Online checkout", "Customer"),
      ],
      ...partial,
    });

  return [
    base({
      id: "ord-001",
      orderNumber: "LUM-0001",
      customerName: "Sarah Chen",
      customerEmail: "sarah.chen@email.com",
      customerPhone: "+1 (415) 555-0142",
      items: [
        {
          productId: "1",
          name: "iPhone 16 Pro",
          brand: "Apple",
          price: 1199,
          quantity: 1,
          variant: "Natural Titanium",
        },
      ],
      subtotal: 1199,
      shipping: 0,
      total: 1199,
      status: "delivered",
      createdAt: "2026-06-01T14:22:00Z",
      updatedAt: "2026-06-04T10:00:00Z",
      internalNotes: "VIP customer — priority packaging.",
      history: [
        createHistoryEntry("Order placed", "Online checkout", "Customer"),
        createHistoryEntry("Payment confirmed", "Stripe charge succeeded", "System"),
        createHistoryEntry("Status changed to processing", undefined, "Admin"),
        createHistoryEntry("Status changed to shipped", "FedEx tracking added", "Admin"),
        createHistoryEntry("Status changed to delivered", undefined, "Admin"),
      ],
    }),
    base({
      id: "ord-002",
      orderNumber: "LUM-0002",
      customerName: "Marcus Webb",
      customerEmail: "marcus.w@email.com",
      customerPhone: "+1 (212) 555-0198",
      items: [
        {
          productId: "3",
          name: "MacBook Pro M4",
          brand: "Apple",
          price: 1999,
          quantity: 1,
          variant: '14"',
        },
        {
          productId: "8",
          name: "AirPods Pro 2",
          brand: "Apple",
          price: 249,
          quantity: 1,
          variant: "USB-C Case",
        },
      ],
      subtotal: 2248,
      shipping: 0,
      total: 2248,
      status: "shipped",
      createdAt: "2026-06-03T09:15:00Z",
      trackingNumber: "1Z999AA10987654321",
    }),
    base({
      id: "ord-003",
      orderNumber: "LUM-0003",
      customerName: "Elena Rodriguez",
      customerEmail: "elena.r@email.com",
      customerPhone: "+1 (305) 555-0167",
      items: [
        {
          productId: "5",
          name: "PlayStation 5 Console",
          brand: "Sony",
          price: 499,
          quantity: 1,
          variant: "Standard Edition",
        },
        {
          productId: "6",
          name: "PS5 DualSense Controller",
          brand: "Sony",
          price: 74,
          quantity: 2,
          variant: "White",
        },
      ],
      subtotal: 647,
      shipping: 0,
      total: 647,
      status: "processing",
      createdAt: "2026-06-07T18:40:00Z",
      internalNotes: "Gift wrap requested.",
    }),
    base({
      id: "ord-004",
      orderNumber: "LUM-0004",
      customerName: "James Park",
      customerEmail: "james.park@email.com",
      customerPhone: "+1 (510) 555-0133",
      items: [
        {
          productId: "7",
          name: "Sony WH-1000XM6",
          brand: "Sony",
          price: 399,
          quantity: 1,
          variant: "Black",
        },
      ],
      subtotal: 399,
      shipping: 9.99,
      total: 408.99,
      status: "pending",
      paymentStatus: "pending",
      createdAt: "2026-06-08T11:05:00Z",
    }),
    base({
      id: "ord-005",
      orderNumber: "LUM-0005",
      customerName: "Aisha Patel",
      customerEmail: "aisha.p@email.com",
      customerPhone: "+1 (650) 555-0188",
      items: [
        {
          productId: "2",
          name: "Samsung Galaxy S25",
          brand: "Samsung",
          price: 999,
          quantity: 1,
          variant: "Phantom Black",
        },
      ],
      subtotal: 999,
      shipping: 0,
      total: 999,
      status: "cancelled",
      paymentStatus: "refunded",
      createdAt: "2026-06-02T16:30:00Z",
      internalNotes: "Customer requested cancellation before shipment.",
    }),
    base({
      id: "ord-006",
      orderNumber: "LUM-0006",
      customerName: "David Kim",
      customerEmail: "david.kim@email.com",
      customerPhone: "+1 (206) 555-0120",
      items: [
        {
          productId: "9",
          name: "Apple Watch Series 10",
          brand: "Apple",
          price: 429,
          quantity: 1,
          variant: "42mm",
        },
        {
          productId: "11",
          name: "MagSafe Charger",
          brand: "Apple",
          price: 39,
          quantity: 1,
          variant: "Standard",
        },
      ],
      subtotal: 468,
      shipping: 0,
      total: 468,
      status: "delivered",
      createdAt: "2026-05-28T08:12:00Z",
    }),
    base({
      id: "ord-007",
      orderNumber: "LUM-0007",
      customerName: "Rachel Torres",
      customerEmail: "rachel.t@email.com",
      customerPhone: "+1 (312) 555-0155",
      items: [
        {
          productId: "4",
          name: "Dell XPS 15",
          brand: "Dell",
          price: 1649,
          quantity: 1,
          variant: "Platinum Silver",
        },
      ],
      subtotal: 1649,
      shipping: 0,
      tax: 148.41,
      total: 1797.41,
      status: "processing",
      createdAt: "2026-06-09T07:30:00Z",
      notes: "Please leave at front desk.",
    }),
  ];
}

function defaultHomepageFeatured(): HomepageFeatured[] {
  return [
    { productId: "1", imageFirst: true },
    { productId: "3", imageFirst: false },
  ];
}

function createSeedDb(): Database {
  return {
    products: seedProducts.map((p) => ({
      ...p,
      stockCount: p.inStock === false ? 0 : 50,
    })),
    orders: seedOrders(),
    homepageFeatured: defaultHomepageFeatured(),
  };
}

function migrateDb(raw: Partial<Database>): Database {
  const orders = (raw.orders ?? []).map((o) => normalizeOrder(o));
  const products = (raw.products ?? []).map((p) => ({
    ...p,
    stockCount: p.stockCount ?? (p.inStock === false ? 0 : 50),
  }));
  const homepageFeatured = raw.homepageFeatured?.length
    ? raw.homepageFeatured
    : defaultHomepageFeatured();

  return { products, orders, homepageFeatured };
}

function readDbFromDisk(dbPath: string): Database | null {
  try {
    if (!fs.existsSync(dbPath)) return null;
    const raw = JSON.parse(fs.readFileSync(dbPath, "utf-8")) as Partial<Database>;
    return migrateDb(raw);
  } catch {
    return null;
  }
}

function writeDbToDisk(dbPath: string, db: Database): void {
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
  } catch {
    // Serverless filesystem may be read-only outside /tmp — memory cache still works
  }
}

export function getDb(): Database {
  if (memoryDb) return memoryDb;

  const dbPath = getDbPath();
  const fromDisk = readDbFromDisk(dbPath);

  if (fromDisk) {
    memoryDb = fromDisk;
    return memoryDb;
  }

  memoryDb = createSeedDb();
  writeDbToDisk(dbPath, memoryDb);
  return memoryDb;
}

export function saveDb(db: Database): void {
  memoryDb = db;
  writeDbToDisk(getDbPath(), db);
}
