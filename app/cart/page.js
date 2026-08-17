"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <main className="max-w-2xl mx-auto px-6 py-12">
                <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
                <p className="text-neutral-500">Your cart is empty.</p>
                <Link href="/" className="text-sm underline mt-4 inline-block">
                    Continue shopping
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

            <div className="space-y-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 border-b border-neutral-200 pb-4"
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
                            className="w-14 border border-neutral-300 rounded-md text-center py-1"
                        />
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-neutral-400 hover:text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
                <p className="text-lg font-semibold">
                    Total: ${cartTotal.toFixed(2)}
                </p>
                <Link
                    href="/checkout"
                    className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                    Checkout
                </Link>
            </div>
        </main>
    );
}