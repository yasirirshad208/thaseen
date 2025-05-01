import mongoose, { Schema, Document, Types } from 'mongoose';

export interface SubCategory extends Document {
    _id: string;
    name: string;
    category: string;
}


const SubCategorySchema: Schema<SubCategory> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
},
    {
        timestamps: true
    }
);

const SubCategoryModel =
    (mongoose.models.SubCategory as mongoose.Model<SubCategory>) ||
    mongoose.model<SubCategory>('SubCategory', SubCategorySchema);

export default SubCategoryModel;