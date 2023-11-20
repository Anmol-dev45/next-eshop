import prisma from "@/libs/db/prisma";

interface Iparams {
  id?: string;
}

export default async function getProductById(params: Iparams) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!product) null;
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
