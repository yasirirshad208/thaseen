import dbConnect from '@/lib/dbConnect';
import TermsModel from '@/models/Terms';

// Fetch all categories (GET)
export async function GET( request: Request,
    { params }: { params: { id: string } }) {
    await dbConnect();

    try {
        const ui = await TermsModel.findOne();
        return Response.json(ui, { status: 200 });
    } catch (error) {
        return Response.json(
            { success: false, message: 'Error fetching', error },
            { status: 500 }
        );
    }
}
