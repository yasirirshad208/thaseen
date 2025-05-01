import dbConnect from '@/lib/dbConnect';
import SubCategoryModel from '@/models/SubCategory';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {
            name,
            category
        } = await request.json();


        const alreadyAdded = await SubCategoryModel.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') },
        });
        
        if (alreadyAdded) {
            return Response.json(
                {
                    success: false,
                    message: 'Sub Category already added',
                },
                { status: 400 }
            );
        }


        const newCategory = new SubCategoryModel({
            name,
            category
        });

        await newCategory.save();


        return Response.json(
            {
                success: true,
                message: 'Sub Category created successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error adding sub category',
                error
            },
            { status: 500 }
        );
    }
}