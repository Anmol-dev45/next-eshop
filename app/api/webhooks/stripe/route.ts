import Stripe from "stripe";
import { headers } from "next/headers";
import prisma from "@/libs/db/prisma";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;
  if (!signature) return new Response("No signature", { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === "string") {
        await prisma.order.update({
          where: {
            payment_intent_id: charge.payment_intent,
          },
          data: {
            status: "complete",
            address: {
              set: charge.shipping?.address,
            },
          },
        });
      }

      break;
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
