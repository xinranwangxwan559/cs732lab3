import express from "express";

const router = express.Router();

// Hardcoded products list for testing
const products = [
  { id: "1", name: "Abra", cost: 180, image: "/images/Abra.png" },
  { id: "2", name: "Clefairy", cost: 500, image: "/images/Clefairy.png" },
  { id: "3", name: "Nidorina", cost: 1200, image: "/images/Nidorina.png" },
  { id: "4", name: "Dratini", cost: 2800, image: "/images/Dratini.png" },
  { id: "5", name: "Scyther", cost: 5500, image: "/images/Scyther.png" },
  { id: "6", name: "Porygon", cost: 9999, image: "/images/Porygon.png" }
];

// Serve up all products on a GET call to /
router.get("/", (req, res) => res.json(products));

export default router;
