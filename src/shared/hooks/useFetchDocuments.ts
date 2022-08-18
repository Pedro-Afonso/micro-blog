import { handleError } from "./../utils/handleError";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (
  docCollection: string,
  search: string | null = null,
  uid: string | null | undefined = null
) => {
  const [documents, setDocuments] = useState<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // deal with memory leak
  let isCancelled = false;

  useEffect(() => {
    const loadData = async () => {
      if (isCancelled) return;
      if (!search && !uid) {
        return;
      }
      setLoading(true);

      const collectionRef = collection(db, docCollection);

      try {
        let q;

        if (search) {
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = query(collectionRef, where("userId", "==", uid));
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"));
        }
        onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (err) {
        setError(handleError(err));
      } finally {
        setLoading(false);
      }
    };
    console.log("loaddata");
    loadData();
  }, [docCollection, search, uid]);

  useEffect(() => {
    return () => {
      isCancelled = true;
    };
  }, []);

  return { documents, loading, error };
};
