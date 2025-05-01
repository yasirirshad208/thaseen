import dbConnect from '@/lib/dbConnect';
import CollectionModel from '@/models/Collection';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { name: string } }
) {
  await dbConnect();

  try {
    const { name } = context.params;

    const collection = await CollectionModel.findOne({name}).populate('products');

    if (!collection) {
      return Response.json(
        { success: false, message: 'Collection not found' },
        { status: 404 }
      );
    }

    return Response.json(collection, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: 'Error fetching collection', error },
      { status: 500 }
    );
  }
}
