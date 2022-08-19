import { useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CreatePost } from "../pages/CreatePost";
import { Dashboard } from "../pages/Dashboard";
import { EditPost } from "../pages/EditPost";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Post } from "../pages/Post";
import { Register } from "../pages/Register";
import { useAuthContext } from "../shared/context/AuthContext";
import { useAuthentication } from "../shared/hooks/useAuthentication";

export const AppRoutes = () => {
  const { user } = useAuthContext();
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  if (loadingUser) {
    console.log("loading");
    console.log(user);
    return <p>Carregando...</p>;
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/post/create"
        element={user ? <CreatePost /> : <Navigate to="/login" />}
      />
      <Route
        path="/post/edit/:id"
        element={user ? <EditPost /> : <Navigate to="/login" />}
      />
      <Route path="/post/:id" element={<Post />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
