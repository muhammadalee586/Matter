"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function AddToCartButton({ product, compact = false }) {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    function handleClick() {
        addToCart(product);
        showToast(`${product.name} added to cart`);
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
            Add to Cart
        </button>
    );
}