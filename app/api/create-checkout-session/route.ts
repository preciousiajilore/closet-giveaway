import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!siteUrl) {
  throw new Error("Missing NEXT_PUBLIC_SITE_URL");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page" as Stripe.Checkout.SessionCreateParams.UiMode,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "Buy Precious a Coffee",
              description: "A small support payment for the closet giveaway app.",
            },
            unit_amount: 300,
          },
          quantity: 1,
        },
      ],
      return_url: `${siteUrl}/support/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Stripe checkout session error:", error.message);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.error("Stripe checkout session error:", error);

    return NextResponse.json(
      { error: "Unknown Stripe checkout error." },
      { status: 500 }
    );
  }
}