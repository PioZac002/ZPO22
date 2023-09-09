import mongoose from 'mongoose';
import { mealSchema } from './mealModel.js';

const orderSchema = new mongoose.Schema({
  orderId: { type: Number },
  meals: [{ type: mealSchema }],
  status: { type: Boolean },
});

export const Order = mongoose.model('Order', orderSchema);
