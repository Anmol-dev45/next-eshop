import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";

interface IParams {
  params: {
    id?: string;
  };
}

const Order = async ({ params }: IParams) => {
  const order = await getOrderById(params);
  console.log(order);
  if (!order) return <NullData text="No Orders" />;

  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
