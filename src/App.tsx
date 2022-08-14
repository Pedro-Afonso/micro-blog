import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { Navbar } from "./shared/components/Navbar";
import { AppAuthProvider } from "./shared/context/AuthContext";
import { useAuthentication } from "./shared/hooks/useAuthentication";

export const App = () => {
  const { auth } = useAuthentication();
  return (
    <AppAuthProvider auth={auth}>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </AppAuthProvider>
  );
};
