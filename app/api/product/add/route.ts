import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {
            name,
            stockStatus,
            coverImage,
            images,
            slug,
            sku,
            price,
            description,
            bestSeller,
            category,
            subCategory,
            sale,
            video,
            sizes
        } = await request.json();


        const alreadyAdded = await ProductModel.findOne({
            slug
        });

        if (alreadyAdded) {
            return Response.json(
                {
                    success: false,
                    message: 'Product slug must be unique',
                },
                { status: 400 }
            );
        }


        const newProduct = new ProductModel({
            name,
            stockStatus,
            coverImage,
            images,
            slug,
            sku,
            price,
            description,
            bestSeller,
            category,
            subCategory,
            video,
            sale,
            sizes
        });


        await newProduct.save();
<<<<<<< HEAD
        console.log(newProduct)
=======
>>>>>>> 300f77b08c091cd14165b75fd02c7d03817097cc


        return Response.json(
            {
                success: true,
                message: 'product created successfully',
<<<<<<< HEAD
                product:newProduct
=======
>>>>>>> 300f77b08c091cd14165b75fd02c7d03817097cc
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error)
        return Response.json(
            {
                success: false,
                message: 'Error adding product',
                error
            },
            { status: 500 }
        );
    }
}