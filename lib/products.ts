import { getDb, saveDb } from "@/lib/db";
import { Category, Product, AdminStats } from "@/lib/types";

export function getAllProducts(): Product[] {
  return getDb().products;
}

export function getProductById(id: string): Product | undefined {
  return getDb().products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getDb().products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return getDb().products.filter((p) => p.category === category);
}

export function getNewArrivals(): Product[] {
  return getDb().products.filter((p) => p.isNew);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getDb()
    .products.filter(
      (p) => p.category === product.category && p.id !== product.id
    )
    .slice(0, limit);
}

export function createProduct(product: Product): Product {
  const db = getDb();
  db.products.push(product);
  saveDb(db);
  return product;
}

export function updateProduct(id: string, data: Partial<Product>): Product | null {
  const db = getDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  db.products[index] = { ...db.products[index], ...data };
  saveDb(db);
  return db.products[index];
}

export function deleteProduct(id: string): boolean {
  const db = getDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return false;

  db.products.splice(index, 1);
  saveDb(db);
  return true;
}

export function getAdminStats(): AdminStats {
  const db = getDb();
  const activeOrders = db.orders.filter((o) => o.status !== "cancelled");
  const paidOrders = activeOrders.filter((o) => o.paymentStatus === "paid");
  const revenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const emails = new Set(activeOrders.map((o) => o.customerEmail));

  return {
    totalProducts: db.products.length,
    totalOrders: db.orders.length,
    revenue,
    pendingOrders: db.orders.filter((o) => o.status === "pending").length,
    processingOrders: db.orders.filter((o) => o.status === "processing").length,
    shippedOrders: db.orders.filter((o) => o.status === "shipped").length,
    outOfStock: db.products.filter((p) => p.inStock === false).length,
    newArrivals: db.products.filter((p) => p.isNew).length,
    averageOrderValue:
      paidOrders.length > 0 ? Math.round(revenue / paidOrders.length) : 0,
    totalCustomers: emails.size,
  };
}

export function updateStock(id: string, stockCount: number, inStock: boolean): Product | null {
  return updateProduct(id, { stockCount, inStock });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function nextProductId(): string {
  const products = getAllProducts();
  const maxId = products.reduce(
    (max, p) => Math.max(max, parseInt(p.id, 10) || 0),
    0
  );
  return String(maxId + 1);
}
