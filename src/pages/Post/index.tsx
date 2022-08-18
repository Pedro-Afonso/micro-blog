import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../shared/hooks/useFetchDocument";

import { main, container, content } from "./styles.module.css";
import { IPostCollection } from "../../shared/interface/ICollections";

export const Post = () => {
  const { id } = useParams();

  const {
    document: post,
    error,
    loading,
  } = useFetchDocument<IPostCollection>("posts", id);

  return (
    <div className={main}>
      <div className={container}>
        {post && (
          <div className={content}>
            <h2>{post.title}</h2>
            <span>Criado por: {post.createdBy}</span>
            <img src={post.image} alt={post.title} />
            <p>{post.body}</p>
            <div>
              {post.tagsArray.map((tag: any, key: any) => (
                <span key={key}>#{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
