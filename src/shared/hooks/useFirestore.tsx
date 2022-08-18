import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../../firebase/config";
import { handleError } from "../utils/handleError";

enum firestoreAction {
  INSERTED = "INSERTED",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
  LOADING = "LOADING",
  ERROR = "ERROR",
}

interface IState {
  loading: boolean;
  error: string | null;
  success: boolean;
  document: DocumentData | null;
}

interface IAction {
  type: firestoreAction;
  payload?: {
    document?: IState["document"];
    error?: IState["error"];
  };
}

const initialState: IState = {
  loading: false,
  error: null,
  success: false,
  document: null,
};

const firestoreReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case firestoreAction.INSERTED:
      return {
        loading: false,
        error: null,
        success: true,
        document: action.payload?.document ? action.payload.document : null,
      };
    case firestoreAction.UPDATED:
      return {
        loading: false,
        error: null,
        success: true,
        document: null,
      };
    case firestoreAction.DELETED:
      return {
        loading: false,
        error: null,
        success: true,
        document: null,
      };
    case firestoreAction.LOADING:
      return {
        loading: true,
        error: null,
        success: false,
        document: null,
      };
    case firestoreAction.ERROR:
      return {
        loading: false,
        error: action.payload?.error ? action.payload.error : null,
        success: false,
        document: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (docCollection: any) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  // deal with memory leak
  let isCancelled = false;
  const checkCancelBeforeDispatch = (action: IAction) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async <T,>(document: T) => {
    checkCancelBeforeDispatch({ type: firestoreAction.LOADING });
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );
      checkCancelBeforeDispatch({
        type: firestoreAction.INSERTED,
        payload: { document: insertedDocument },
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: firestoreAction.ERROR,
        payload: { error: handleError(error) },
      });
    }
  };

  const updateDocument = async <T,>(id: string, data: T) => {
    checkCancelBeforeDispatch({
      type: firestoreAction.LOADING,
    });
    try {
      const docRef = doc(db, docCollection, id);

      await updateDoc(docRef, data);

      checkCancelBeforeDispatch({
        type: firestoreAction.UPDATED,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: firestoreAction.ERROR,
        payload: { error: handleError(error) },
      });
    }
  };

  const deleteDocument = async (id: string) => {
    checkCancelBeforeDispatch({
      type: firestoreAction.LOADING,
    });
    try {
      await deleteDoc(doc(db, docCollection, id));

      checkCancelBeforeDispatch({
        type: firestoreAction.DELETED,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: firestoreAction.ERROR,
        payload: { error: handleError(error) },
      });
    }
  };

  useEffect(() => {
    return () => {
      isCancelled = true;
    };
  }, []);

  return { insertDocument, updateDocument, deleteDocument, response };
};
