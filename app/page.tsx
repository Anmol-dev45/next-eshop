import { products } from "@/constants";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/product/ProductCard";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
         2xl:grid-cols-5"
        >
          {products.map((product) => (
            <ProductCard key={product.name} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
