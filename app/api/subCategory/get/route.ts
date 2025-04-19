import dbConnect from '@/lib/dbConnect';
import SubCategoryModel from '@/models/SubCategory';

export async function GET(req: Request) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    try {
        const filter = category ? { category } : {};


        const subCategories = await SubCategoryModel.find(filter);

        return Response.json(subCategories, { status: 200 });
    } catch (error) {
        console.log(error)
        return Response.json(
            { success: false, message: 'Error fetching sub categories', error },
            { status: 500 }
        );
    }
}
