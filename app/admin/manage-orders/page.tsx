import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import ManageOrders from "./ManageOrders";
import getOrders from "@/actions/getOrders";

const ManageOrdersPage = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData text="You are not authorized to view this page" />;
  }
  return (
    <div className="p-8">
      <Container>
        <ManageOrders orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrdersPage;
