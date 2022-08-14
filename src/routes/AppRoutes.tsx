import { Route, Routes } from "react-router-dom";
import { Register } from "../pages/Register";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
