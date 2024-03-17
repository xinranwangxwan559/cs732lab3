import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "./AppContextProvider";
import { useNavigate } from "react-router-dom";
import useShoppingCartProducts from "./useShoppingCartProducts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function CheckoutPage() {
  const { cart, clearCart } = useContext(AppContext); // Assuming 'cart' is part of your context and contains the product IDs
  const [error, setError] = useState(""); // State to handle error messages
  const navigate = useNavigate();

  function handlePay() {
    // Assuming 'cart' contains the items to be posted
    const productIds = cart.map(item => item.productId);

    axios.post(`${API_BASE_URL}/api/orders`, productIds)
      .then(() => {
        clearCart(); // Clear the cart on successful order submission
        navigate("/orders", { replace: true }); // Redirect to the orders page
      })
      .catch((error) => {
        console.error("Order submission failed:", error);
        setError("Failed to place the order. Please try again."); // Set an error message to be displayed
      });
  }

  return (
    <>
      <h1>🚀Rocket Game Corner 🚀 - Checkout</h1>
      {/* Error message display */}
      {error && <p className="error">{error}</p>}
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.count} {item.product.name}, 🪙{item.product.cost.toLocaleString("en-NZ")}ea
          </li>
        ))}
      </ul>
      <p>
        <strong>Total cost:</strong> 🪙{/* Calculation of total cost */}
      </p>
      <button onClick={handlePay}>Pay now</button>
    </>
  );
}
