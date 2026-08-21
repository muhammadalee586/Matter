import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PackageOpen } from "lucide-react";

export default async function OrderHistoryPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
    });

    return (
        <main className="max-w-2xl mx-auto px-6 py-12">
            <h1 className="font-display text-3xl mb-6">Your Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <PackageOpen size={40} className="mx-auto mb-4 text-neutral-300" />
                    <p className="text-neutral-500 mb-2">No orders yet.</p>
                    <Link href="/" className="text-sm text-forest underline underline-offset-4">
                        Go shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {orders.map((order) => (
                        <Link
                            key={order.id}
                            href={`/account/orders/${order.id}`}
                            className="flex justify-between items-center border border-line rounded-lg px-4 py-3 hover:bg-white transition-colors"
                        >
                            <div>
                                <p className="text-sm font-medium">Order #{order.id}</p>
                                <p className="text-xs text-neutral-500">
                                    {new Date(order.createdAt).toLocaleDateString()} — {order.status}
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-forest">
                                ${Number(order.total).toFixed(2)}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}