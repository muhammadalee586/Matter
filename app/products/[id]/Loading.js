export default function Loading() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="aspect-square bg-line rounded-xl animate-pulse" />

            <div>
                <div className="h-8 bg-line rounded w-2/3 mb-4 animate-pulse" />
                <div className="h-5 bg-line rounded w-1/4 mb-6 animate-pulse" />
                <div className="h-4 bg-line rounded w-full mb-2 animate-pulse" />
                <div className="h-4 bg-line rounded w-5/6 mb-6 animate-pulse" />
                <div className="h-11 bg-line rounded-lg w-40 animate-pulse" />
            </div>
        </main>
    );
}