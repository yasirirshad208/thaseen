import dbConnect from '@/lib/dbConnect';
import CollectionModel from '@/models/Collection';
import '@/models/Product'; // 👈 Required to register the schema
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { name: string } }
) {
  await dbConnect();

  try {
    const { name } = context.params;

    const collection = await CollectionModel.findOne({ name }).populate('products');

    if (!collection) {
      return Response.json(
        { success: false, message: 'Collection not found' },
        { status: 404 }
      );
    }

    // Filter out any nulls due to deleted products
    collection.products = collection.products.filter((product: any) => product !== null);

    return Response.json(collection, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: 'Error fetching collection', error },
      { status: 500 }
    );
  }
}
