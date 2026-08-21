"use client";

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function PaymentForm({ onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError("");

        const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (confirmError) {
            setError(confirmError.message);
            setLoading(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            onSuccess(paymentIntent);
        } else {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-forest text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-50"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
}
