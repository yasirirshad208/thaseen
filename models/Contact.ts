import mongoose, { Schema, Document } from 'mongoose';

export interface Contact extends Document {
    _id:string;
    name:string;
    email:string;
    phone:string;
    subject:string;
    message:string;
  }


   const ContactSchema: Schema<Contact> = new mongoose.Schema({
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      subject: {
        type: String,
        trim: true,
      },
      message: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps:true
    }
  );
    
    const ContactModel =
      (mongoose.models.Contact as mongoose.Model<Contact>) ||
      mongoose.model<Contact>('Contact', ContactSchema);
    
    export default ContactModel;