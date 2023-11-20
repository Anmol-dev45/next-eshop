import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import OrderClient from "./OrderClient";

const OrdersPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData text="No orders yet..." />;
  }
  const orders = await getOrdersByUserId(currentUser.id);
  return (
    <div className="p-8">
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
};

export default OrdersPage;
