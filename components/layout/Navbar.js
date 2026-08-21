"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { cartCount } = useCart();
    const { data: session, status } = useSession();

    return (
        <header className="border-b border-line bg-stone">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="font-display text-xl italic tracking-tight text-ink">
                    Matter.
                </Link>

                <div className="flex items-center gap-6">
                    {status === "loading" ? null : session ? (
                        <>
                            <span className="text-sm text-neutral-500">
                                Hi, {session.user.name}
                            </span>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="text-sm font-medium"
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="text-sm font-medium">
                            Log in
                        </Link>
                    )}

                    <Link href="/cart" className="text-sm font-medium text-ink hover:text-forest transition-colors">
                        Cart {cartCount > 0 && <span className="text-forest">({cartCount})</span>}
                    </Link>
                </div>
            </nav>
        </header>
    );
}