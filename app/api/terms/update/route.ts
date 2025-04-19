import dbConnect from "@/lib/dbConnect";
import TermsModel from "@/models/Terms";


export async function PUT(request: Request) {
     await dbConnect();
  try {
    const { content } = await request.json();

    const policy = await TermsModel.findOneAndUpdate(
      {}, // Empty filter to update the single existing document.
      { content, updatedAt: new Date() },
      { new: true, upsert: true } // Create if not exist.
    );

    return Response.json(
        {
            success: true,
            message: 'Terms updated',
        },
        { status: 200 }
    );
  } catch (error) {
    return Response.json(
        {
            success: false,
            message: 'Error updating terms & conditions',
        },
        { status: 500 }
    );
  }
};
