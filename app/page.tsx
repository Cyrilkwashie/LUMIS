import HomeContent from "@/components/HomeContent";
import { getHomepageFeaturedProducts } from "@/lib/homepage";
import { getNewArrivals } from "@/lib/products";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const newArrivals = getNewArrivals().slice(0, 4);
  const featuredProducts = getHomepageFeaturedProducts();

  return (
    <HomeContent
      newArrivals={newArrivals}
      featuredProducts={featuredProducts}
    />
  );
}
