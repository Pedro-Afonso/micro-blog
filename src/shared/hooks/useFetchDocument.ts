import { useState, useEffect } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { handleError } from "../utils/handleError";

export const useFetchDocument = <T>(docCollection: string, id?: string) => {
  const [document, setDocument] = useState<DocumentData | T>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //deal with memory leak
  let isCancelled = false;

  useEffect(() => {
    const loadDocument = async () => {
      if (isCancelled) return;
      setLoading(true);

      try {
        if (!id) {
          return;
        }

        const docRef = doc(db, docCollection, id);

        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());
      } catch (error) {
        setError(handleError(error));
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [docCollection, id]);

  useEffect(() => {
    return () => {
      isCancelled = true;
    };
  }, []);

  return { document, loading, error };
};
