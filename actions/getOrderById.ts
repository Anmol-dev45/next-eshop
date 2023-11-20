import prisma from "@/libs/db/prisma";

interface Iparams {
  id?: string;
}

export default async function getOrderById(params: Iparams) {
  try {
    const { id } = params;
    const orders = await prisma.order.findUnique({
      where: {
        id,
      },
    });
    if (!orders) return null;

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
