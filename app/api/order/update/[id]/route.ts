import OrderModel from "@/models/Order";
import dbConnect from "@/lib/dbConnect";

export async function PATCH(request:Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const { paymentStatus, deliveryStatus } = body;

  try {
    await dbConnect();

    const updatedFields = {
        paymentStatus,
        deliveryStatus
    };
    if (paymentStatus) updatedFields.paymentStatus = paymentStatus;
    if (deliveryStatus) updatedFields.deliveryStatus = deliveryStatus;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedOrder) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedOrder), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update order" }),
      { status: 500 }
    );
  }
}
