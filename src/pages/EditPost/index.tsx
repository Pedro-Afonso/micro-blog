import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FlashMessage } from "../../shared/components/FlashMessage";
import { useAuthContext } from "../../shared/context/AuthContext";
import { useFetchDocument } from "../../shared/hooks/useFetchDocument";
import { useFirestore } from "../../shared/hooks/useFirestore";
import { IPostCollection } from "../../shared/interface/ICollections";
import styles from "./style.module.css";

interface IPostForm {
  title: string;
  body: string;
  image: string;
  tags?: string;
}

interface IDocument extends IPostForm {
  tagsArray: string[];
  createdBy: string | null;
  userId: string;
}

export const EditPost = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { updateDocument, response } = useFirestore("posts");

  const { user } = useAuthContext();

  const {
    document: mydocument,
    error: docError,
    loading: docLoading,
  } = useFetchDocument<IPostCollection>("posts", id);

  const { register, handleSubmit } = useForm<IPostForm>();

  useEffect(() => {
    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      setMessage("Publicação salvada com sucesso!");
    }
  }, [response]);

  const onSubmit = async (data: IPostForm) => {
    setError("");
    setMessage("");
    const { title, body, image, tags } = data;

    if (!title || !body || !image || !tags) {
      return setError("Por favor, preencha todos os campos.");
    }

    try {
      new URL(image);
    } catch {
      return setError("A imagem precisa ser uma URL.");
    }

    if (!user || !id) {
      return setError("Ocorreu um erro, tente novamente mais tarde.");
    }

    await updateDocument<IDocument>(id, {
      title,
      body,
      image,
      tagsArray: tags.replace(/\s+/g, "").split(","),
      userId: user.uid,
      createdBy: user.displayName,
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mydocument && (
            <>
              <label>
                <span>Título</span>
                <input
                  {...register("title", { maxLength: 50 })}
                  placeholder="Pense em um bom título..."
                  type="text"
                  disabled={response.loading || docLoading}
                  defaultValue={mydocument.title}
                />
              </label>
              <label>
                <span>URL da imagem:</span>
                <input
                  {...register("image")}
                  placeholder="Insira uma imagem que representa o seu post..."
                  type="text"
                  disabled={response.loading || docLoading}
                  defaultValue={mydocument.image}
                />
              </label>
              <label>
                <span>Conteúdo</span>
                <textarea
                  {...register("body", { maxLength: 2500 })}
                  placeholder="Insira o conteúdo do post"
                  disabled={response.loading || docLoading}
                  defaultValue={mydocument.body}
                />
              </label>
              <label>
                <span>Tags</span>
                <input
                  {...register("tags", {
                    maxLength: 100,
                  })}
                  placeholder="Insira as tags separadas por vígulas"
                  type="text"
                  disabled={response.loading || docLoading}
                  defaultValue={mydocument.tagsArray}
                />
              </label>
              <button type="submit">Salvar</button>
            </>
          )}
          <FlashMessage
            error={error || docError}
            message={message}
            isLoading={response.loading || docLoading}
          />
        </form>
      </div>
    </main>
  );
};
