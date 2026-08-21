import prisma from "@/lib/db";
import Link from "next/link";

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true },
    });

    return (
        <div>
            <h2 className="font-display text-2xl mb-6">Orders</h2>

            <div className="bg-white border border-line rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-line text-left text-neutral-500">
                            <th className="px-4 py-3 font-medium">Order</th>
                            <th className="px-4 py-3 font-medium">Customer</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-line last:border-0">
                                <td className="px-4 py-3">
                                    <Link
                                        href={`/admin/orders/${order.id}`}
                                        className="font-medium hover:text-forest transition-colors"
                                    >
                                        #{order.id}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-neutral-600">
                                    {order.user.name}
                                </td>
                                <td className="px-4 py-3 text-neutral-600">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="text-xs bg-stone border border-line px-2 py-1 rounded-full capitalize">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-forest font-medium">
                                    ${Number(order.total).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <p className="text-neutral-500 text-center py-12">No orders yet.</p>
            )}
        </div>
    );
}