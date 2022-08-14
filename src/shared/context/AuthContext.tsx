import { Auth, onAuthStateChanged, User } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";

interface AuthContext {
  user: User | null;
}
const AuthContext = createContext({} as AuthContext);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

interface IAppAuthProviderProps {
  children: React.ReactNode;
  auth: Auth;
}

export const AppAuthProvider: React.FC<IAppAuthProviderProps> = ({
  children,
  auth,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthValue = () => {
  return useContext(AuthContext);
};
