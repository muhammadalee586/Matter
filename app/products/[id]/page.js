import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/product/AddToCartButton";
import DeleteProductButton from "@/components/product/DeleteProductButton";


export default async function ProductDetailPage({ params }) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    });

    if (!product) {
        notFound();
    }

    const serializedProduct = {
        ...product,
        price: Number(product.price),
    };

    return (
        <main className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div>
                <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
                <p className="text-lg text-neutral-600 mb-4">
                    ${Number(product.price).toFixed(2)}
                </p>
                <p className="text-neutral-700 mb-6">{product.description}</p>
                <p className="text-sm text-neutral-500 mb-6">
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
                <AddToCartButton product={serializedProduct} />
                <div className="mt-4">
                    <DeleteProductButton productId={product.id} />
                </div>
                <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-sm text-neutral-500 hover:text-black underline"
                >
                    Edit Product
                </Link>
            </div>
        </main>
    );
}