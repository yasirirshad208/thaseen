import dbConnect from '@/lib/dbConnect';
import SubCategoryModel from '@/models/SubCategory';

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

    await SubCategoryModel.findByIdAndDelete(id);

    return Response.json({ success: true, message: 'Sub category deleted successfully' }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: 'Error deleting sub category', error },
      { status: 500 }
    );
  }
}
