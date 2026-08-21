import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Not authorized" }, { status: 403 });
        }

        const { id } = await params;
        const body = await request.json();
        const { name, description, price, image, category, stock } = body;

        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: { name, description, price, image, category, stock },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to update product" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Not authorized" }, { status: 403 });
        }

        const { id } = await params;

        await prisma.product.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Product deleted" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: 500 }
        );
    }
}