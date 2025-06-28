import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { _id, password } = body;

    if (!_id) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await UserModel.findByIdAndUpdate(
  _id,
  { password: hashedPassword }, 
  { new: true }
);

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(
  JSON.stringify({
    success: true,
  }),
  {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }
);
  } catch (error) {
    console.error("Update error:", error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
    });
  }
}
