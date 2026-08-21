export default function Loading() {
    return (
        <main className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <div className="h-10 w-32 bg-line rounded mb-10 animate-pulse" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i}>
                        <div className="aspect-square bg-line rounded-xl mb-3 animate-pulse" />
                        <div className="h-4 bg-line rounded w-3/4 mb-2 animate-pulse" />
                        <div className="h-4 bg-line rounded w-1/3 animate-pulse" />
                    </div>
                ))}
            </div>
        </main>
    );
}