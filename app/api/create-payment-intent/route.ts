import { getCurrentUser } from "@/actions/getCurrentUser";
import { CartProductType } from "@/app/product/[id]/ProductDetails";
import prisma from "@/libs/db/prisma";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const price = items.reduce((acc, item) => {
    const itemPrice = item.price * item.quantity;
    return acc + itemPrice;
  }, 0);

  return price;
};

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { error: "You must be logged in to make a purchase" },
      { status: 401 }
    );
  }

  const { items, payment_intent_id } = await request.json();

  const total = calculateOrderAmount(items) * 100;
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    payment_intent_id: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    //update the order with the payment intent id

    const current_intent =
      await stripe.paymentIntents.retrieve(payment_intent_id);

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );

      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { payment_intent_id: payment_intent_id },
        }),
        prisma.order.update({
          where: { payment_intent_id: payment_intent_id },
          data: { amount: total, products: items },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid Payment Intent" },
          { status: 400 }
        );
      }
      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      description: "Software development services",
      automatic_payment_methods: { enabled: true },
    });
    //create a new order
    orderData.payment_intent_id = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }
}
