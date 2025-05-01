import dbConnect from '@/lib/dbConnect';
import UiModel from '@/models/Ui';

// Fetch all categories (GET)
export async function GET() {
    await dbConnect();

    try {
        const ui = await UiModel.find({});
        return Response.json(ui, { status: 200 });
    } catch (error) {
        return Response.json(
            { success: false, message: 'Error fetching categories', error },
            { status: 500 }
        );
    }
}
