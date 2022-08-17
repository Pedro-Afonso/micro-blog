import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FlashMessage } from "../../shared/components/FlashMessage";
import { useAuthContext } from "../../shared/context/AuthContext";
import { useFirestore } from "../../shared/hooks/useFirestore";
import { main, container } from "./style.module.css";

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
  const { updateDocument, response } = useFirestore("posts");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<IPostForm>();
  const { user } = useAuthContext();

  useEffect(() => {
    if (response.error) {
      setError(response.error);
    } else if (response.success) {
      setMessage("Criado com sucesso!");
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
    <main className={main}>
      <div className={container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Título</span>
            <input
              {...register("title", { maxLength: 50 })}
              placeholder="Pense em um bom título..."
              type="text"
            />
          </label>
          <label>
            <span>URL da imagem:</span>
            <input
              {...register("image", { maxLength: 50 })}
              placeholder="Insira uma imagem que representa o seu post..."
              type="text"
            />
          </label>
          <label>
            <span>Conteúdo</span>
            <textarea
              {...register("body", { maxLength: 2500 })}
              placeholder="Insira o conteúdo do post"
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
            />
          </label>
          <button type="submit">Salvar</button>
          <FlashMessage
            error={error}
            message={message}
            isLoading={response.loading}
          />
        </form>
      </div>
    </main>
  );
};
