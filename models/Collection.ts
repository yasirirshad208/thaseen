import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Collection extends Document {
  _id: string;
  name?: string;
  image?: string;
  category?: string;
  subCategory?: string;
  products?: Types.ObjectId[]; // or use specific type if available from your Product model
  }
  
  const CollectionSchema: Schema<Collection> = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
      },
      image: {
        type: String,
        required: [true, 'Image is required'],
        trim: true,
      },
      category: {
        type: String,
        trim: true,
      },
      subCategory: {
        type: String,
        trim: true,
      },
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Must match the name used in mongoose.model('Product', ...)
        },
      ],
    },
    {
      timestamps: true,
    }
  );

    const CollectionModel =
      (mongoose.models.Collection as mongoose.Model<Collection>) ||
      mongoose.model<Collection>('Collection', CollectionSchema);
    
    export default CollectionModel;