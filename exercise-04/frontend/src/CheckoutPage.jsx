import { useContext } from "react";
import { AppContext } from "./AppContextProvider";
import { useNavigate } from "react-router-dom";
import useShoppingCartProducts from "./useShoppingCartProducts";

export default function CheckoutPage() {
  const { clearCart } = useContext(AppContext);
  const productsInCart = useShoppingCartProducts();

  const navigate = useNavigate();

  function handlePay() {
    clearCart();
    alert("Thank you for your purchase!");
    navigate("/shop", { replace: true });
  }

  return (
    <>
      <h1>🚀Rocket Game Corner 🚀 - Checkout</h1>
      <ul>
        {productsInCart.map((group, index) => (
          <li key={index}>
            {group.count} {group.product.name}, 🪙{group.product.cost.toLocaleString("en-NZ")}ea
          </li>
        ))}
      </ul>
      <p>
        <strong>Total cost</strong> 🪙{productsInCart.totalCost.toLocaleString("en-NZ")}
      </p>
      <button onClick={handlePay}>Pay now</button>
    </>
  );
}
