
import dbConnect from '@/lib/dbConnect';
import { verifyToken } from '@/lib/verifyToken';
import OrderModel from '@/models/Order';

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

    const orders = await OrderModel.find({"shippingData.email":decoded.email}).sort({createdAt:-1})
    if (!orders) {
      return Response.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return Response.json({ success: true, orders }, { status: 200 });
  } catch (err) {
    return Response.json({ success: false, message: 'Invalid token or server error' }, { status: 401 });
  }
}
