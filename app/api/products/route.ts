import prisma from "@/libs/db/prisma";

import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { name, description, price, category, brand, inStock, images } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      category,
      brand,
      inStock,
      images,
    },
  });

  return NextResponse.json(product);
}
