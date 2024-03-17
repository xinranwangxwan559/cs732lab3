import { Navigate, Route, Routes } from "react-router-dom";
import PokedexLayout from "./PokedexLayout";
import PokedexPage from "./PokedexPage";

/**
 * Main app entry point, controls the routes in this app.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<PokedexLayout />}>
        <Route index element={<Navigate to="1" replace />} />

        <Route path=":id" element={<PokedexPage />} />
      </Route>
    </Routes>
  );
}

export default App;
