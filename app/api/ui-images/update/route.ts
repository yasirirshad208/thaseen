import dbConnect from '@/lib/dbConnect';
import UiModel from '@/models/Ui';

export async function PUT(request: Request) {
    await dbConnect();

    try {
        const {
            _id,
            headerImage,
            contactImage,
            readyToWearImage,
            title,
            description,
            contact_info,
            availibility,
        } = await request.json();

        const existingProduct = await UiModel.findById(_id);

        if (!existingProduct) {
            return Response.json(
                {
                    success: false,
                    message: 'Product not found',
                },
                { status: 404 }
            );
        }


        // Update fields
        existingProduct.headerImage = headerImage;
        existingProduct.contactImage = contactImage;
        existingProduct.readyToWearImage = readyToWearImage;
        existingProduct.title = title;
        existingProduct.description = description;
        existingProduct.contact_info = contact_info;
        existingProduct.availibility = availibility;


    
        await existingProduct.save();

        return Response.json(
            {
                success: true,
                message: 'Updated successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error updating',
                error
            },
            { status: 500 }
        );
    }
}
