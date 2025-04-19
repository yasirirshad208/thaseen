import mongoose, { Schema, Document } from 'mongoose';

interface TermsDocument extends Document {
  content: string;
  updatedAt: Date;
}

const TermsSchema = new Schema<TermsDocument>({
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const TermsModel = mongoose.models.Terms || mongoose.model<TermsDocument>('Terms', TermsSchema);

export default TermsModel;
