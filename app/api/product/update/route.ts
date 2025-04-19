import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';

export async function PUT(request: Request) {
    await dbConnect();

    try {
        const {
            _id,
            name,
            stockStatus,
            coverImage,
            images,
            slug,
            sku,
            price,
            description,
            bestSeller,
            sale,
            category,
            subCategory,
            video
        } = await request.json();

        const existingProduct = await ProductModel.findById(_id);

        if (!existingProduct) {
            return Response.json(
                {
                    success: false,
                    message: 'Product not found',
                },
                { status: 404 }
            );
        }

        // Check for unique slug if it's changed
        if (slug !== existingProduct.slug) {
            const slugExists = await ProductModel.findOne({ slug });
            if (slugExists) {
                return Response.json(
                    {
                        success: false,
                        message: 'Product slug must be unique',
                    },
                    { status: 400 }
                );
            }
        }

        // Update fields
        existingProduct.name = name;
        existingProduct.stockStatus = stockStatus;
        existingProduct.coverImage = coverImage;
        existingProduct.images = images;
        existingProduct.slug = slug;
        existingProduct.sku = sku;
        existingProduct.price = price;
        existingProduct.description = description;
        existingProduct.bestSeller = bestSeller;
        existingProduct.category = category;
        existingProduct.subCategory = subCategory;
        existingProduct.video = video;
        existingProduct.sale = sale;

        await existingProduct.save();

        return Response.json(
            {
                success: true,
                message: 'Product updated successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Error updating product',
                error
            },
            { status: 500 }
        );
    }
}
