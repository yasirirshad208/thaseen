import mongoose, { Schema } from "mongoose";

const CounterSchema = new Schema({
  id: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const CounterModel = mongoose.models.Counter || mongoose.model("Counter", CounterSchema);

export default CounterModel;
