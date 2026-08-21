import prisma from "@/lib/db";
import Link from "next/link";
import AddToCartButton from "@/components/product/AddToCartButton";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || "";
  const q = params?.q || "";

  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  const products = await prisma.product.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(q ? { name: { contains: q } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 md:py-20">
      <h1 className="font-display text-4xl italic mb-8">Matter.</h1>

      <form action="/" className="mb-6">
        {category && <input type="hidden" name="category" value={category} />}
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search products..."
          className="w-full max-w-sm border border-line rounded-full px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
        />
      </form>

      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href={q ? `/?q=${q}` : "/"}
          className={`text-sm px-4 py-2 rounded-full border transition-colors ${!category
            ? "bg-forest text-white border-forest"
            : "border-line hover:bg-white"
            }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.category}
            href={`/?category=${c.category}${q ? `&q=${q}` : ""}`}
            className={`text-sm px-4 py-2 rounded-full border transition-colors ${category === c.category
              ? "bg-forest text-white border-forest"
              : "border-line hover:bg-white"
              }`}
          >
            {c.category}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-neutral-500">No products found.</p>
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
                <h2 className="text-sm font-medium line-clamp-1 min-h-[1.25rem]">
                  {product.name}
                </h2>
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