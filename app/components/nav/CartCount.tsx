"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

import { CiShoppingCart } from "react-icons/ci";
const CartCount = () => {
  const { cartTotalQty }: any = useCart();
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute -right-[6px] -top-[6px] flex aspect-square h-5 items-center justify-center rounded-full bg-slate-700 text-xs text-white ">
        {cartTotalQty}
      </span>
    </div>
  );
};

export default CartCount;
