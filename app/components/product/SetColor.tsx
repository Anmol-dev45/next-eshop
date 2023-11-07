import {
  CartProductType,
  SelectedImgType,
} from "@/app/product/[id]/ProductDetails";

interface SetColorProps {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  handColorSelect: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handColorSelect,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR:</span>
        <div className="flex">
          {images.map((image) => (
            <div
              key={image.color}
              className={`h-7 aspect-square rounded-full border-teal-300 flex items-center justify-center ${
                cartProduct.selectedImg.color === image.color
                  ? "border-[1.5px]"
                  : "border-0"
              }`}
              onClick={() => handColorSelect(image)}
            >
              <div
                style={{ background: image.colorCode }}
                className="h-5 aspect-square rounded-full border-[1.2px] border-slate-300"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
