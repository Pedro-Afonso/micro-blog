import { Route, Routes } from "react-router-dom";
import { CreatePost } from "../pages/CreatePost";
import { EditPost } from "../pages/EditPost";
import { Login } from "../pages/Login";
import { Post } from "../pages/Post";
import { Register } from "../pages/Register";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post/create" element={<CreatePost />} />
      <Route path="/post/edit/:id" element={<EditPost />} />
      <Route path="/post/:id" element={<Post />} />
    </Routes>
  );
};
