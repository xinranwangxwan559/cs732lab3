import express from "express";
import { v4 as uuid } from "uuid"; // Importing UUID to generate unique IDs for new orders

const router = express.Router();

// An array where we can store our orders.
const orders = [];

// Gets all orders
router.get("/", (req, res) => {
  res.json(orders);
});

// Adds a new order
router.post("/", (req, res) => {
  // Generate a unique ID for the new order
  const newId = uuid();

  // Create a new order object with the unique ID and the array of product IDs from the request body
  const newOrder = {
    id: newId,
    order: req.body // Assuming req.body is an array of product IDs
  };

  // Add the new order to the orders array
  orders.push(newOrder);

  // Return a 201 status code for "created", set the Location header, and send the new order object as the response
  return res.status(201).location(`/api/orders/${newId}`).json(newOrder);
});

export default router;
