export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Not authorized" }, { status: 403 });
        }

        const body = await request.json();
        const { name, description, price, image, category, stock } = body;

        const product = await prisma.product.create({
            data: { name, description, price, image, category, stock },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}