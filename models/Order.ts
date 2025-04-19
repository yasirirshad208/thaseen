import mongoose, { Schema, Document } from 'mongoose';
import CounterModel from './Counter';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageSrc: string;
  size: string;
  sku: string | null;
  measurements?: {
    shoulder: string;
    hips: string;
    bust: string;
    waist: string;
    lengthFromShoulderToFloor: string;
    sleeveLength: string;
  };
  additionalInstructions?: string;
}

interface ShippingDetails {
  name: string;
  phoneNumber: string;
  phoneCountryCode: string;
  email: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postcode: string;
}

export interface OrderDocument extends Document {
    _id:string
    orderId:number
  shippingData: ShippingDetails;
  cart: CartItem[];
  totalAmount: number;
  paymentStatus: string;
  deliveryStatus: string;
  createdAt: Date;
}

const MeasurementSchema = new Schema({
  shoulder: String,
  hips: String,
  bust: String,
  waist: String,
  lengthFromShoulderToFloor: String,
  sleeveLength: String,
}, { _id: false });

const CartItemSchema = new Schema({
  id: { type: String, required: true },
  name: String,
  price: Number,
  quantity: Number,
  imageSrc: String,
  size: String,
  sku: String,
  measurements: { type: MeasurementSchema, required: false },
  additionalInstructions: String,
}, { _id: false });

const ShippingSchema = new Schema({
  name: String,
  phoneNumber: String,
  phoneCountryCode: String,
  email: String,
  country: String,
  city: String,
  addressLine1: String,
  addressLine2: String,
  postcode: String,
}, { _id: false });

const OrderSchema = new Schema<OrderDocument>({
  orderId: { type: Number, unique: true },
  shippingData: { type: ShippingSchema, required: true },
  cart: { type: [CartItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, default: 'pending' },
  deliveryStatus: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

OrderSchema.pre<OrderDocument>("save", async function (next) {
  if (!this.isNew) return next();

  const counter = await CounterModel.findOneAndUpdate(
    { id: "orderId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.orderId = counter!.seq;
  next();
});

const OrderModel = mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);

export default OrderModel;
