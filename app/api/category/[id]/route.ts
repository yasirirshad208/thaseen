import dbConnect from '@/lib/dbConnect';
import CategoryModel from '@/models/Category';

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

    await CategoryModel.findByIdAndDelete(id);

    return Response.json({ success: true, message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: 'Error deleting category', error },
      { status: 500 }
    );
  }
}
