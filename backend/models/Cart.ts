import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
});

const CartSchema = new mongoose.Schema({
  userId: String,
  items: [CartItemSchema],
});

export default mongoose.model("Cart", CartSchema);
