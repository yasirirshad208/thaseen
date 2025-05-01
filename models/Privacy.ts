import mongoose, { Schema, Document } from 'mongoose';

interface PrivacyPolicyDocument extends Document {
  content: string;
  updatedAt: Date;
}

const PrivacyPolicySchema = new Schema<PrivacyPolicyDocument>({
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const PrivacyPolicyModel = mongoose.models.PrivacyPolicy || mongoose.model<PrivacyPolicyDocument>('PrivacyPolicy', PrivacyPolicySchema);

export default PrivacyPolicyModel;
