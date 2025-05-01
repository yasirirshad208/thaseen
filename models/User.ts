import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    _id:string
    name:string;
    phone:string
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date; 
    isVerified: boolean;
    admin:boolean
    verificationToken:string,
    verificationTokenExpiry:Date
  }
  

  const UserSchema: Schema<User> = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
        type: String,
      },
    verifyCode: {
      type: String,
    },
    verifyCodeExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    admin: {
      type: Boolean,
      default: false,
      required:true
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date,
    },
  },{
    timestamps:true
  });
  
  const UserModel =
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>('User', UserSchema);
  
  export default UserModel;