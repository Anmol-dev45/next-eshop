import { CartProductType } from "@/app/product/[id]/ProductDetails";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  paymentIntent: string | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleQuantityIncrease: (product: CartProductType) => void;
  handleQuantityDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  handleSetPaymentIntent: (paymentIntent: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems = localStorage.getItem("eShopCartItems");
    const CartProduct: CartProductType[] = JSON.parse(cartItems!);
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent!);
    if (cartItems) {
      setCartProducts(CartProduct);
      setPaymentIntent(paymentIntent);
    }
  }, []);

  useEffect(() => {
    const getTotals = () => {
      return (
        cartProducts?.reduce(
          (acc, item) => {
            const { quantity, price } = item;
            const itemTotal = price * quantity;
            acc.total += itemTotal;
            acc.qty += quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        ) ?? { total: 0, qty: 0 }
      );
    };
    const { total, qty } = getTotals();
    setCartTotalQty(qty);
    setCartTotalAmount(total);
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
    toast.success("Product added to cart");
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const updatedCart = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
        toast.success("Product removed");
      }
    },
    [cartProducts]
  );

  const handleQuantityIncrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 99) {
        return toast.error("Maximum quantity reached");
      }
      if (cartProducts) {
        const updatedCart = cartProducts.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleQuantityDecrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 1) {
        return toast.error("Minimum quantity reached");
      }
      if (cartProducts) {
        const updatedCart = cartProducts.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.removeItem("eShopCartItems");
  }, []);

  const handleSetPaymentIntent = useCallback((paymentIntent: string | null) => {
    setPaymentIntent(paymentIntent);
    localStorage.setItem("eShopPaymentIntent", JSON.stringify(paymentIntent));
  }, []);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    paymentIntent,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
    handleClearCart,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
