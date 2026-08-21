import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Not authorized" }, { status: 403 });
        }

        const { id } = await params;
        const { status } = await request.json();

        const order = await prisma.order.update({
            where: { id: Number(id) },
            data: { status },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to update order" },
            { status: 500 }
        );
    }
}