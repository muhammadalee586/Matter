"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
    const { cartCount } = useCart();
    const { data: session, status } = useSession();

    return (
        <header className="border-b border-line bg-stone sticky top-0 z-10">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="font-display text-xl italic tracking-tight text-ink">
                    Matter.
                </Link>

                <div className="flex items-center gap-6">
                    {status === "loading" ? null : session ? (
                        <>
                            <span className="text-sm text-neutral-500 hidden sm:inline">
                                Hi, {session.user.name}
                            </span>
                            <Link
                                href="/account/orders"
                                className="text-sm font-medium text-ink hover:text-forest transition-colors"
                            >
                                Orders
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="text-sm font-medium text-ink hover:text-forest transition-colors"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="text-sm font-medium text-ink hover:text-forest transition-colors"
                        >
                            Log in
                        </Link>
                    )}

                    <Link
                        href="/cart"
                        className="flex items-center gap-1.5 text-sm font-medium text-ink hover:text-forest transition-colors"
                    >
                        <ShoppingBag size={18} />
                        {cartCount > 0 && <span className="text-forest">{cartCount}</span>}
                    </Link>
                </div>
            </nav>
        </header>
    );
}