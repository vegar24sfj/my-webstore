import express from "express";
import Cart from "../models/Cart";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { items: [] });
});

router.post("/", async (req, res) => {
  const { userId, items } = req.body;
  let cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = items;
  } else {
    cart = new Cart({ userId, items });
  }
  await cart.save();
  res.json(cart);
});

router.delete("/:userId", async (req, res) => {
  await Cart.deleteOne({ userId: req.params.userId });
  res.json({ message: "Cart cleared" });
});

export default router;
