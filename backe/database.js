import mongoose from 'mongoose';
import { Meal } from './mealModel.js';
import { Order } from './orderModel.js';

export const connectToMongo = () => {
  const connectionString =
    'mongodb+srv://piotrulekzacminski:123@zpo2.fhic5jj.mongodb.net/Menu';
  mongoose.connect(connectionString).then(() => {
    console.log('connected to mongo');
  });
};

export const getMeals = async () => {
  try {
    const meals = await Meal.find();
    if (meals && meals.length > 0) return meals;
    else return ['fail'];
  } catch (e) {
    console.log(e);
  }
};
export const createOrder = async (orderData) => {
  try {
    const newOrder = new Order(orderData);
    return await newOrder.save();
  } catch (e) {
    console.log(e);
  }
};
export const changeOrderStatus = async (order) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: order.orderId },
      { status: true },
      { new: true }
    );
    if (order) return 1;
    else return 0;
  } catch (e) {
    console.log(e);
  }
};
export const getOrdersWithStatus = async (status) => {
  try {
    const orders = await Order.find({ status: status }).populate('meals');
    return orders;
  } catch (e) {
    console.log(e);
  }
};

export const getAllOrders = async () => {
  try {
    const orders = await Order.find().populate('meals');
    return orders;
  } catch (e) {
    console.log(e);
  }
};
