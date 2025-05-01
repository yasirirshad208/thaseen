import dbConnect from '@/lib/dbConnect';
import CollectionModel from '@/models/Collection';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {
            name,
            image,
            category,
            subCategory,
            products
        } = await request.json();


        const alreadyAdded = await CollectionModel.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });
        
        if (alreadyAdded) {
            return Response.json(
                {
                    success: false,
                    message: 'Collection already added',
                },
                { status: 400 }
            );
        }


        const newCollection = new CollectionModel({
            name,
            image,
            category,
            subCategory,
            products
        });

        await newCollection.save();


        return Response.json(
            {
                success: true,
                message: 'Collection created successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error adding collection',
                error
            },
            { status: 500 }
        );
    }
}