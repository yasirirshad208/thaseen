
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function GET(request:Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await dbConnect();

    

    const user = await UserModel.findById(id);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update order" }),
      { status: 500 }
    );
  }
}
