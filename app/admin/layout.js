import Link from "next/link";

export default function AdminLayout({ children }) {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <h1 className="font-display text-3xl mb-2">Admin Dashboard</h1>
            <p className="text-sm text-neutral-500 mb-8">Manage your store</p>

            <nav className="flex gap-2 mb-10 border-b border-line">
                <Link
                    href="/admin"
                    className="text-sm font-medium px-4 py-3 border-b-2 border-transparent hover:border-forest transition-colors"
                >
                    Overview
                </Link>
                <Link
                    href="/admin/products"
                    className="text-sm font-medium px-4 py-3 border-b-2 border-transparent hover:border-forest transition-colors"
                >
                    Products
                </Link>
                <Link
                    href="/admin/orders"
                    className="text-sm font-medium px-4 py-3 border-b-2 border-transparent hover:border-forest transition-colors"
                >
                    Orders
                </Link>
            </nav>

            {children}
        </div>
    );
}