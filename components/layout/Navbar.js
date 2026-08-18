"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { cartCount } = useCart();
    const { data: session, status } = useSession();

    return (
        <header className="border-b border-neutral-200">
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold tracking-tight">
                    Matter
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

                    <Link href="/cart" className="text-sm font-medium">
                        Cart {cartCount > 0 && `(${cartCount})`}
                    </Link>
                </div>
            </nav>
        </header>
    );
}