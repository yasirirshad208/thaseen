import dbConnect from '@/lib/dbConnect';
import CollectionModel from '@/models/Collection';

export async function PUT(request: Request) {
    await dbConnect();

    try {
        const {
            id,
            name,
            image,
            category,
            subCategory,
            products
        } = await request.json();


        const collection = await CollectionModel.findById(id);

        if (!collection) {
            return Response.json(
                {
                    success: false,
                    message: 'Collection not found',
                },
                { status: 404 }
            );
        }

        if (name !== collection.name) {
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
                }
        


    
            collection.name = name
            collection.image =image
            collection.category=category
            collection.subCategory=subCategory
            collection.products=products

        await collection.save();


        return Response.json(
            {
                success: true,
                message: 'Collection updated successfully',
            },
            { status: 200 }
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