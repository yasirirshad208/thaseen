import mongoose, { Schema, Document } from 'mongoose';

export interface Category extends Document {
    _id:string;
    name:string;
  }


   const CategorySchema: Schema<Category> = new mongoose.Schema({
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
      },
    },
    {
      timestamps:true
    }
  );
    
    const CategoryModel =
      (mongoose.models.Category as mongoose.Model<Category>) ||
      mongoose.model<Category>('Category', CategorySchema);
    
    export default CategoryModel;