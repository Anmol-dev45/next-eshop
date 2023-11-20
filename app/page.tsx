import { products } from "@/constants";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/product/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import { notFound } from "next/navigation";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  if (!products.length)
    return <NullData text='No Products found. Click "All" to clear filters' />;

  function shuffleArray(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const shuffledProducts = shuffleArray(products);
  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
         2xl:grid-cols-5"
        >
          {shuffledProducts.map((product) => (
            <ProductCard key={product.name} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
