import prisma from "@/lib/db";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteProductButton from "@/components/product/DeleteProductButton";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl">Products</h2>
                <Link
                    href="/admin/products/new"
                    className="bg-forest text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-light transition-colors"
                >
                    + Add Product
                </Link>
            </div>

            <div className="bg-white border border-line rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-line text-left text-neutral-500">
                            <th className="px-4 py-3 font-medium">Product</th>
                            <th className="px-4 py-3 font-medium">Category</th>
                            <th className="px-4 py-3 font-medium">Price</th>
                            <th className="px-4 py-3 font-medium">Stock</th>
                            <th className="px-4 py-3 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-line last:border-0">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-10 h-10 object-cover rounded-md bg-stone"
                                        />
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="font-medium hover:text-forest transition-colors line-clamp-1"
                                        >
                                            {product.name}
                                        </Link>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-neutral-600">{product.category}</td>
                                <td className="px-4 py-3 text-forest font-medium">
                                    ${Number(product.price).toFixed(2)}
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={
                                            product.stock < 5
                                                ? "text-red-500 font-medium"
                                                : "text-neutral-600"
                                        }
                                    >
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="text-neutral-400 hover:text-ink transition-colors"
                                            aria-label="Edit product"
                                        >
                                            <Pencil size={16} />
                                        </Link>
                                        <DeleteProductButton productId={product.id} iconOnly />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {products.length === 0 && (
                <p className="text-neutral-500 text-center py-12">No products yet.</p>
            )}
        </div>
    );
}
