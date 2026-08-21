import prisma from "@/lib/db";
import Link from "next/link";
import AddToCartButton from "@/components/product/AddToCartButton";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl italic mb-10">Matter.</h1>

      {products.length === 0 ? (
        <p className="text-neutral-500">No products yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div key={product.id} className="group">
              <Link href={`/products/${product.id}`}>
                <div className="aspect-square bg-white border border-line rounded-xl overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h2 className="text-sm font-medium">{product.name}</h2>
                <p className="text-sm text-forest font-medium mb-3">
                  ${Number(product.price).toFixed(2)}
                </p>
              </Link>
              <AddToCartButton
                product={{ ...product, price: Number(product.price) }}
                compact
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}