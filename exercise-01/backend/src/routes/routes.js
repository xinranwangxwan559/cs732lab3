import express from "express";
import { pokemon } from "../data/pokemon.js";

const router = express.Router();

// A dummy route which will simply return the text "Hello, World".
router.get("/api/hello", (req, res) => {
  res.send("Hello, World");
});

// TODO Add your routes here.

export default router;
