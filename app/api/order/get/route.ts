export const dynamic = "force-dynamic";

import OrderModel from "@/models/Order";
import dbConnect from "@/lib/dbConnect"; // your MongoDB connection util

export async function GET() {
  try {
    await dbConnect(); // connect to MongoDB

    const orders = await OrderModel.find().sort({ createdAt: -1 });

    return Response.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch orders" }),
      { status: 500 }
    );
  }
}
