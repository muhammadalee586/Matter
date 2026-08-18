"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CheckoutPage() {
    const { cart, cartTotal } = useCart();
    const { data: session, status } = useSession();
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [shipping, setShipping] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setShipping((prev) => ({ ...prev, [name]: value }));
    }

    function handleContinue(e) {
        e.preventDefault();
        setStep(2);
    }

    if (cart.length === 0) {
        return (
            <main className="max-w-lg mx-auto px-6 py-12">
                <p className="text-neutral-500">
                    Your cart is empty.{" "}
                    <Link href="/" className="underline">
                        Go shopping
                    </Link>
                </p>
            </main>
        );
    }

    if (status === "unauthenticated") {
        return (
            <main className="max-w-lg mx-auto px-6 py-12">
                <p className="text-neutral-500">
                    Please{" "}
                    <Link href="/login" className="underline">
                        log in
                    </Link>{" "}
                    to check out.
                </p>
            </main>
        );
    }

    return (
        <main className="max-w-lg mx-auto px-6 py-12">
            <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
            <p className="text-sm text-neutral-500 mb-8">
                Step {step} of 2 — {step === 1 ? "Shipping info" : "Review order"}
            </p>

            {step === 1 && (
                <form onSubmit={handleContinue} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={shipping.fullName}
                            onChange={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={shipping.address}
                            onChange={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                value={shipping.city}
                                onChange={handleChange}
                                required
                                className="w-full border border-neutral-300 rounded-md px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={shipping.postalCode}
                                onChange={handleChange}
                                required
                                className="w-full border border-neutral-300 rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={shipping.phone}
                            onChange={handleChange}
                            required
                            className="w-full border border-neutral-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                    >
                        Continue to Review
                    </button>
                </form>
            )}

            {step === 2 && (
                <div>
                    <div className="border border-neutral-200 rounded-lg p-4 mb-4">
                        <h2 className="text-sm font-medium mb-2">Shipping to:</h2>
                        <p className="text-sm text-neutral-600">
                            {shipping.fullName}<br />
                            {shipping.address}, {shipping.city} {shipping.postalCode}<br />
                            {shipping.phone}
                        </p>
                    </div>

                    <div className="space-y-3 mb-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>
                                    {item.name} × {item.quantity}
                                </span>
                                <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-neutral-200 pt-4 mb-6">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(1)}
                            className="flex-1 border border-neutral-300 px-6 py-3 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => alert("Stripe payment goes here — Step 11")}
                            className="flex-1 bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}