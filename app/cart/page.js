"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Trash2 } from "lucide-react";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <main className="max-w-2xl mx-auto px-6 py-20 text-center">
                <ShoppingBag size={40} className="mx-auto mb-4 text-neutral-300" />
                <h1 className="font-display text-3xl mb-2">Your Cart</h1>
                <p className="text-neutral-500 mb-4">Your cart is empty.</p>
                <Link
                    href="/"
                    className="text-sm text-forest underline underline-offset-4"
                >
                    Continue shopping
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="font-display text-3xl mb-6">Your Cart</h1>

            <div className="space-y-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 border-b border-line pb-4"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md bg-neutral-100"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-sm text-neutral-500">
                                ${Number(item.price).toFixed(2)}
                            </p>
                        </div>
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                                updateQuantity(item.id, Number(e.target.value))
                            }
                            className="w-14 border border-line rounded-md text-center py-1 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                        />
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
                <p className="text-lg font-semibold text-forest">
                    Total: ${cartTotal.toFixed(2)}
                </p>
                <Link
                    href="/checkout"
                    className="bg-forest text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-forest-light transition-colors"
                >
                    Checkout
                </Link>
            </div>
        </main>
    );
}