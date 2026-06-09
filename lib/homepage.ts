import { getDb, saveDb } from "@/lib/db";
import { getProductById } from "@/lib/products";
import { HomepageFeatured, Product } from "@/lib/types";

export function getHomepageFeatured(): HomepageFeatured[] {
  return getDb().homepageFeatured ?? [];
}

export function getHomepageFeaturedProducts(): {
  product: Product;
  imageFirst: boolean;
}[] {
  return getHomepageFeatured()
    .map((entry) => {
      const product = getProductById(entry.productId);
      if (!product) return null;
      return { product, imageFirst: entry.imageFirst };
    })
    .filter(Boolean) as { product: Product; imageFirst: boolean }[];
}

export function setHomepageFeatured(
  featured: HomepageFeatured[]
): HomepageFeatured[] {
  const db = getDb();
  db.homepageFeatured = featured;
  saveDb(db);
  return featured;
}
