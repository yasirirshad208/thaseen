import dbConnect from '@/lib/dbConnect';
import CollectionModel from '@/models/Collection';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const { id } = params;

    if (!id) {
      return Response.json({ success: false, message: 'Missing ID' }, { status: 400 });
    }

    await CollectionModel.findByIdAndDelete(id);

    return Response.json({ success: true, message: 'Collection deleted successfully' }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: 'Error deleting collection', error },
      { status: 500 }
    );
  }
}
