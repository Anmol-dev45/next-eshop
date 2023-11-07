"use client";
import { CartProductType } from "../product/[id]/ProductDetails";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import { useCart } from "@/hooks/useCart";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount }: any = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="mt-2 flex items-center gap-1 text-slate-500 "
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="mt-4 w-full ">
        <div className="grid grid-cols-5 items-center gap-4 pb-2 text-xs font-bold">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QUANTITY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>
        {cartProducts &&
          cartProducts.map((item: CartProductType) => (
            <ItemContent key={item.id} item={item} />
          ))}
      </div>
      <div className="padding flex items-start justify-between gap-4 border-t-[1.5px] border-slate-200 py-4">
        <div className="w-[100px]">
          <Button
            label="Clear Cart"
            onClick={() => handleClearCart()}
            small
            outline
          />
        </div>
        <div className="flex flex-col items-start gap-1 text-sm">
          <div className="flex w-full justify-between text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and Shipping calculated at checkout
          </p>
          <Button label="checkout" onClick={() => {}} />
          <Link
            href={"/"}
            className="mt-2 flex items-center gap-1 text-slate-500 "
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
