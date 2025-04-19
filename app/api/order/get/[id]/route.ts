import OrderModel from "@/models/Order";
import dbConnect from "@/lib/dbConnect";

export async function GET( request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await dbConnect();

    const order = await OrderModel.findById(id);

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch order" }),
      { status: 500 }
    );
  }
}
