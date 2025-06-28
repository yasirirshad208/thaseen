import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  await dbConnect();

  try {
    const { slug } = context.params;

    const product = await ProductModel.findOne({ slug });

    if (!product) {
      return Response.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json(product, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: 'Error fetching product', error },
      { status: 500 }
    );
  }
}
