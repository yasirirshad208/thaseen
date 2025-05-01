

 import mongoose, { Schema, Document } from 'mongoose';
 
 export interface Ui extends Document {
     _id:string;
     headerImage:string;
     contactImage:string;
      readyToWearImage:string;
      title:string;
     description:string;
     contact_info:string;
      availibility:string;
   }
 
 
    const UiSchema: Schema<Ui> = new mongoose.Schema({
        headerImage: {
         type: String,
         trim: true,
       },
       readyToWearImage: {
        type: String,
        trim: true,
      },
      title: {
        type: String,
        trim: true,
      },
      contactImage: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      contact_info: {
        type: String,
        trim: true,
      },
      availibility: {
        type: String,
        trim: true,
      }
     },
     {
       timestamps:true
     }
   );
     
     const UiModel =
       (mongoose.models.Ui as mongoose.Model<Ui>) ||
       mongoose.model<Ui>('Ui', UiSchema);
     
     export default UiModel;