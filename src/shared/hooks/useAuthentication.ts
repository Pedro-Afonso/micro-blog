import { handleError } from "../utils/handleError";
import "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  // Deal with memory leak
  let isCancelled = false;
  const checkIfIsCancelled = () => {
    if (isCancelled) {
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
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: any) => {
    checkIfIsCancelled();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      isCancelled = true;
    };
  }, []);

  return { auth, createUser, login, error, loading };
};
