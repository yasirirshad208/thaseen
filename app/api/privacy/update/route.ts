import dbConnect from "@/lib/dbConnect";
import PrivacyPolicyModel from "@/models/Privacy";


export async function PUT(request: Request) {
     await dbConnect();
  try {
    const { content } = await request.json();

    const policy = await PrivacyPolicyModel.findOneAndUpdate(
      {}, // Empty filter to update the single existing document.
      { content, updatedAt: new Date() },
      { new: true, upsert: true } // Create if not exist.
    );

    return Response.json(
        {
            success: true,
            message: 'Privacy updated',
        },
        { status: 200 }
    );
  } catch (error) {
    return Response.json(
        {
            success: false,
            message: 'Error updating privacy policy',
        },
        { status: 500 }
    );
  }
};
