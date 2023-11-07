import Container from "@/app/components/Container";
import { products } from "@/constants";
import ProductDetails from "./ProductDetails";
import ListRating from "@/app/product/[id]/ListRating";

interface IParams {
  params: {
    id: string;
  };
}

const Product = ({ params }: IParams) => {
  const product = products.find((item) => item.id === params.id);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flexflex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
