import dbConnect from '@/lib/dbConnect';
import PrivacyPolicyModel from '@/models/Privacy';

// Fetch all categories (GET)
export async function GET( request: Request,
    { params }: { params: { id: string } }) {
    await dbConnect();

    try {
        const ui = await PrivacyPolicyModel.findOne();
        return Response.json(ui, { status: 200 });
    } catch (error) {
        return Response.json(
            { success: false, message: 'Error fetching', error },
            { status: 500 }
        );
    }
}
