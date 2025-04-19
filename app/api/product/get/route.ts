import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);

        const category = searchParams.get('category');
        const subCategory = searchParams.get('subCategory');
        const bestSeller = searchParams.get('bestSeller');
        const sale = searchParams.get('sale');

        const query: any = {};

        if (category) query.category = category;
        if (subCategory) query.subCategory = subCategory;
        if (bestSeller) query.bestSeller = bestSeller;
        if (sale === 'true') query.sale = { $gt: 0 };

        const products = await ProductModel.find(query).sort({ createdAt: -1 });

        return Response.json(products, { status: 200 });
    } catch (error) {
        return Response.json(
            { success: false, message: 'Error fetching products', error },
            { status: 500 }
        );
    }
}
