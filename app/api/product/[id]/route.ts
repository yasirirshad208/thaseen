import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';

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

    await ProductModel.findByIdAndDelete(id);

    return Response.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: 'Error deleting Product', error },
      { status: 500 }
    );
  }
}
