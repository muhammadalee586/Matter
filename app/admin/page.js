import prisma from "@/lib/db";

export default async function AdminOverviewPage() {
    const [productCount, orderCount, userCount, orders] = await Promise.all([
        prisma.product.count(),
        prisma.order.count(),
        prisma.user.count(),
        prisma.order.findMany({ select: { total: true } }),
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);

    const stats = [
        { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` },
        { label: "Orders", value: orderCount },
        { label: "Products", value: productCount },
        { label: "Users", value: userCount },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white border border-line rounded-xl p-5"
                >
                    <p className="text-xs text-neutral-500 mb-1">{stat.label}</p>
                    <p className="font-display text-2xl">{stat.value}</p>
                </div>
            ))}
        </div>
    );
}