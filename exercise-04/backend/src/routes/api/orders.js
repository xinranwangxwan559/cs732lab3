import express from "express";

// This can let us create a random uuid we can use as id values, by calling the uuid() function.
// e.g. const newId = uuid();
import { v4 as uuid } from "uuid";

const router = express.Router();

// An array where we can store our orders.
const orders = [];

// Gets all orders
router.get("/", (req, res) => res.json(orders));

// TODO Your code here

export default router;
