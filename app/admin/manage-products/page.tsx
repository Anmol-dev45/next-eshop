import Container from "@/app/components/Container";
import ManageProducts from "./ManageProducts";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageProductsPage = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData text="You are not authorized to view this page" />;
  }
  return (
    <div className="p-8">
      <Container>
        <ManageProducts products={products} />
      </Container>
    </div>
  );
};

export default ManageProductsPage;
