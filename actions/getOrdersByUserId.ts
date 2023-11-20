import prisma from "@/libs/db/prisma";

export default async function getOrdersByUserId(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        userId,
      },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
