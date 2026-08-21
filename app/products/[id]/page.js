import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/product/AddToCartButton";
import DeleteProductButton from "@/components/product/DeleteProductButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Pencil } from "lucide-react";

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

    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "admin";

    return (
        <main className="max-w-4xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="aspect-square bg-white border border-line rounded-xl overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div>
                <h1 className="font-display text-3xl mb-2">{product.name}</h1>
                <p className="text-lg text-forest font-medium mb-4">
                    ${Number(product.price).toFixed(2)}
                </p>
                <p className="text-neutral-700 mb-6">{product.description}</p>
                <p className="text-sm text-neutral-500 mb-6">
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>

                <AddToCartButton product={serializedProduct} />

                {isAdmin && (
                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-line">
                        <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-ink underline"
                        >
                            <Pencil size={16} />
                            Edit Product
                        </Link>
                        <DeleteProductButton productId={product.id} />
                    </div>
                )}
            </div>
        </main>
    );
}