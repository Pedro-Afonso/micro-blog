import { FirebaseError } from "firebase/app";

interface MessagesIndex {
  [index: string]: string;
}

const firebaseErrors: MessagesIndex = {
  "auth/user-not-found": "Usuário não encontrado.",
  "auth/wrong-password": "Senha incorreta.",
  "auth/too-many-requests":
    "As solicitações foram bloqueadas devido a muitas tentativas de login. Tente novamente depois de algum tempo.",
  "auth/weak-password": "A senha precisa conter pelo menos 6 caracteres.",
  "auth/email-already-in-use": "E-mail já cadastrado.",
};

export const handleFirebaseError = (error: FirebaseError): string => {
  const { code, message } = error;

  if (firebaseErrors[code]) {
    return firebaseErrors[code];
  } else {
    console.log(message);
    return "Ocorreu um erro, por favor tente mais tarde.";
  }
};

export const handleError = (error: any): string => {
  if (error instanceof FirebaseError) {
    return handleFirebaseError(error);
  } else {
    console.log(error);
    return "Ocorreu um erro, por favor tente mais tarde.";
  }
};
