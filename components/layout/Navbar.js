"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { cartCount } = useCart();

    return (
        <header className="border-b border-neutral-200">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold tracking-tight">
                    Matter
                </Link>
                <Link href="/cart" className="text-sm font-medium">
                    Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
            </nav>
        </header>
    );
}