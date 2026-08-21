import Link from "next/link";
import { PackageX } from "lucide-react";

export default function NotFound() {
    return (
        <main className="max-w-lg mx-auto px-6 py-24 text-center">
            <PackageX size={48} className="mx-auto mb-6 text-neutral-300" />
            <h1 className="font-display text-3xl mb-2">Page not found</h1>
            <p className="text-neutral-500 mb-6">
                The page you're looking for doesn't exist or may have been moved.
            </p>
            <Link
                href="/"
                className="inline-block bg-forest text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-forest-light transition-colors"
            >
                Back to shop
            </Link>
        </main>
    );
}