import mongoose, { Schema, Document } from 'mongoose';

export interface Product extends Document {
    _id:string;
    name:string;
    stockStatus:string;
    coverImage:string;
    images:string[];
    slug:string;
    sku:string;
    price:number;
    description:string;
    bestSeller:boolean;
    category:string;
    subCategory:string
    video:string;
    sizes:string[];
    sale:number
  }


   const ProductSchema: Schema<Product> = new mongoose.Schema({
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
      },
      stockStatus: {
        type: String,
        required: [true, 'Stock status is required'],
        trim: true,
      },
      coverImage: {
        type: String,
        trim: true,
      },
      video: {
        type: String,
      },
      images: {
        type: [String],
      },
      sizes: {
        type: [String],
      },
      slug: {
        type: String,
        required: [true, 'Slug is required'],
        trim: true,
        unique:true,
      },
      sku: {
        type: String,
        trim: true,
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
      },
      description: {
        type: String,
      },
      bestSeller:{
        type: Boolean,
        default:false
      },
      category:{
        type: String,
      },
      subCategory:{
        type: String,
      },
      sale:{
        type: Number,
        default:0
      }
    },
    {
      timestamps:true
    }
  );
    
    const ProductModel =
      (mongoose.models.Product as mongoose.Model<Product>) ||
      mongoose.model<Product>('Product', ProductSchema);
    
    export default ProductModel;