import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function AdminOrderDetailPage({ params }) {
    const { id } = await params;

    const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            orderItems: { include: { product: true } },
        },
    });

    if (!order) {
        notFound();
    }

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl">Order #{order.id}</h2>
                <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
            </div>

            <div className="bg-white border border-line rounded-xl p-6 mb-6">
                <h3 className="text-sm font-medium mb-2">Customer</h3>
                <p className="text-sm text-neutral-600">
                    {order.user.name} — {order.user.email}
                </p>
            </div>

            <div className="bg-white border border-line rounded-xl p-6">
                <h3 className="text-sm font-medium mb-4">Items</h3>
                <div className="space-y-3 mb-4">
                    {order.orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span>
                                {item.product.name} × {item.quantity}
                            </span>
                            <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center border-t border-line pt-4">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-forest">
                        ${Number(order.total).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}