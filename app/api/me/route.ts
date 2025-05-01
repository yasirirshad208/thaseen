
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { verifyToken } from '@/lib/verifyToken';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  await dbConnect();

  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyToken(token);
    if (!decoded) {
      return Response.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }
    const user = await UserModel.findById(decoded._id).select('-password -verifyCode -verifyCodeExpiry');
    if (!user) {
      return Response.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return Response.json({ success: true, user }, { status: 200 });
  } catch (err) {
    console.error('User fetch error:', err);
    return Response.json({ success: false, message: 'Invalid token or server error' }, { status: 401 });
  }
}
