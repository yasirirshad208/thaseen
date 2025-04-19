import dbConnect from '@/lib/dbConnect';
import CategoryModel from '@/models/Category';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {
            name,
        } = await request.json();


        const alreadyAdded = await CategoryModel.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });
        
        if (alreadyAdded) {
            return Response.json(
                {
                    success: false,
                    message: 'Category already added',
                },
                { status: 400 }
            );
        }


        const newCategory = new CategoryModel({
            name,
        });

        await newCategory.save();


        return Response.json(
            {
                success: true,
                message: 'Category created successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error adding category',
                error
            },
            { status: 500 }
        );
    }
}