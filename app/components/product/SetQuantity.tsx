import { CartProductType } from "@/app/product/[id]/ProductDetails";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const btnStyle =
  "px-2 rounded border-[1.2px] border-slate-300 hover:border-teal-300 focus:outline-none";

const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <span className="font-semibold">QUANTITY:</span>}
      <div className="flex items-center gap-4">
        <button className={btnStyle} onClick={handleQuantityDecrease}>
          -
        </button>
        <span className="font-semibold">{cartProduct.quantity}</span>
        <button className={btnStyle} onClick={handleQuantityIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
