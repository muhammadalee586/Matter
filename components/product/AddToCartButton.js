"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product, compact = false }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    function handleClick() {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    return (
        <button
            onClick={handleClick}
            className={
                compact
                    ? "w-full border border-line rounded-lg text-xs font-medium py-2 hover:bg-forest hover:text-white hover:border-forest transition-colors"
                    : "bg-forest text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-forest-light transition-colors"
            }
        >
            {added ? "Added ✓" : "Add to Cart"}
        </button>
    );
}