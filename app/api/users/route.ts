
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';

export async function GET(req: Request) {
  await dbConnect();

  try {
    

    const users = await UserModel.find().select('-password -verifyCode -verifyCodeExpiry').sort({createdAt: -1});

    return Response.json({ success: true, users }, { status: 200 });
  } catch (err) {
    return Response.json({ success: false, message: 'server error' }, { status: 401 });
  }
}
