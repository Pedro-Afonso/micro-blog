import "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  // Deal with memory leak
  const [cancelled, setCancelled] = useState(false);
  const checkIfIsCancelled = () => {
    if (cancelled) {
      return;
    }
  };

  const createUser = async (data: any) => {
    checkIfIsCancelled();
    setLoading(true);
    setError("");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });
      return user;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser };
};
