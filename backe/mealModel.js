import mongoose from 'mongoose';

export const mealSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
});

export const Meal = mongoose.model('Meal', mealSchema);
