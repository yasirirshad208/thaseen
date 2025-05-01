import dbConnect from '@/lib/dbConnect';
import CollectionModel from '@/models/Collection';

export async function GET(req: Request) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');

    try {
        // Build the filter object
        const filter: any = {};

        if (category) {
            filter.category = category;
        }

        if (subCategory) {
            filter.subCategory = subCategory;
        }

        const collections = await CollectionModel.find(filter);

        return Response.json(collections, { status: 200 });
    } catch (error) {
        return Response.json(
            { success: false, message: 'Error fetching collections', error },
            { status: 500 }
        );
    }
}
