
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function PATCH(request:Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const { adminStatus } = body;

  try {
    await dbConnect();

    const updatedFields = {
        admin:adminStatus,
    }

    const updatedOrder = await UserModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedOrder) {
      return new Response(JSON.stringify({ error: "User not found" }), {
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
