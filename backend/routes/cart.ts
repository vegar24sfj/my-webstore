import express from "express";
import Cart from "../models/Cart";

const router = express.Router();

// POST /api/cart – lagre eller oppdater cart
router.post("/", async (req, res) => {
  const { userId, items } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID mangler" });
  }

  try {
    const existingCart = await Cart.findOne({ userId });

    if (existingCart) {
      existingCart.items = items;
      await existingCart.save();
    } else {
      await Cart.create({ userId, items });
    }

    res.status(200).json({ message: "Cart lagret" });
  } catch (err) {
    console.error("Feil ved lagring av cart:", err);
    res.status(500).json({ error: "Noe gikk galt" });
  }
});

export default router;
