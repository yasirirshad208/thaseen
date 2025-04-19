import dbConnect from '@/lib/dbConnect';
import CategoryModel from '@/models/Category';

// Fetch all categories (GET)
export async function GET() {
    await dbConnect();

    try {
        const categories = await CategoryModel.find({});
        return Response.json(categories, { status: 200 });
    } catch (error) {
        return Response.json(
            { success: false, message: 'Error fetching categories', error },
            { status: 500 }
        );
    }
}
