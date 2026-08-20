import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function OrderDetailPage({ params }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const order = await prisma.order.findUnique({
        where: { id: Number(id) },
        include: {
            orderItems: {
                include: { product: true },
            },
        },
    });

    if (!order || order.userId !== session.user.id) {
        notFound();
    }

    return (
        <main className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="text-2xl font-semibold mb-2">Order Confirmed 🎉</h1>
            <p className="text-sm text-neutral-500 mb-8">Order #{order.id}</p>

            <div className="space-y-3 mb-6">
                {order.orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span>
                            {item.product.name} × {item.quantity}
                        </span>
                        <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center border-t border-neutral-200 pt-4 mb-8">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${Number(order.total).toFixed(2)}</span>
            </div>

            <Link href="/" className="text-sm underline">
                Continue shopping
            </Link>
        </main>
    );
}