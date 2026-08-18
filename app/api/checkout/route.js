import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { amount } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create payment intent" },
            { status: 500 }
        );
    }
}