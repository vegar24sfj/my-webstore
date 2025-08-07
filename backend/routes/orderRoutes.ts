import express from "express";
import Order from "../models/Order";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, items, totalAmount } = req.body;
  const newOrder = new Order({ userId, items, totalAmount });
  await newOrder.save();
  res.json(newOrder);
});

router.get("/:userId", async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

export default router;
