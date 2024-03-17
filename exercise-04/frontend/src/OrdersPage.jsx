import { useContext } from "react";
import { AppContext } from "./AppContextProvider";
import { createCartSummary } from "./useShoppingCartProducts";
import styles from "./OrdersPage.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/**
 * Renders a list of orders obtained from the API.
 */
export default function OrdersPage() {
  const { products } = useContext(AppContext);

  // TODO Swap this out for an API call to /api/orders.
  const dummyOrders = [
    { id: "order1", order: ["1", "3", "3", "6"] },
    { id: "order2", order: ["6", "6", "2", "5", "1"] },
    { id: "order3", order: ["5", "5", "5", "5"] }
  ];

  // Turn orders from a list of product ids into a summary format as shown in the user's shopping cart
  const orderSummaries = dummyOrders.map((order) => ({
    id: order.id,
    summary: createCartSummary(products, order.order)
  }));

  return (
    <>
      <h1>🚀Rocket Game Corner 🚀 - My Order History</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Products ordered</th>
            <th>Total cost</th>
          </tr>
        </thead>
        <tbody>
          {orderSummaries.map((os) => (
            <tr key={os.id}>
              <td>{os.id}</td>
              <td>{getOrderSummaryString(os.summary)}</td>
              <td>{os.summary.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/**
 * Turns an order summary into a string, e.g. 1 Abra, 2 Nidorina, 1 Porygon
 */
function getOrderSummaryString(summary) {
  return summary.map((line) => `${line.count} ${line.product.name}`).join(", ");
}
