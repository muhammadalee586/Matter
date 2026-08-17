"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }) {
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
            className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
            {added ? "Added ✓" : "Add to Cart"}
        </button>
    );
}