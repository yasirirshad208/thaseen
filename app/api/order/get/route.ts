import OrderModel from "@/models/Order";
import dbConnect from "@/lib/dbConnect"; // your MongoDB connection util

export async function GET() {
  try {
    await dbConnect(); // connect to MongoDB

    const orders = await OrderModel.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch orders" }),
      { status: 500 }
    );
  }
}
