import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return Response.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    } 

    // Check if user is verified
    if (!user.isVerified) {
      return Response.json(
        { success: false, message: 'Email not verified' },
        { status: 403 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create JWT
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.admin, email:user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '3d' }
    );

    return Response.json(
      {
        success: true,
        message: 'Login successful',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          admin: user.admin,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
