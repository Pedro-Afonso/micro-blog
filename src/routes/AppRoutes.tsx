import { Route, Routes } from "react-router-dom";
import { CreatePost } from "../pages/CreatePost";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  );
};
