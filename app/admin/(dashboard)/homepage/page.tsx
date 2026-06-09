import AdminHeader from "@/components/admin/AdminHeader";
import HomepageEditor from "@/components/admin/HomepageEditor";
import { getHomepageFeatured } from "@/lib/homepage";
import { getAllProducts } from "@/lib/products";

export default function HomepageAdminPage() {
  const featured = getHomepageFeatured();
  const products = getAllProducts();

  return (
    <>
      <AdminHeader
        title="Homepage"
        description="Manage featured products shown on the storefront homepage."
      />
      <HomepageEditor featured={featured} products={products} />
    </>
  );
}
