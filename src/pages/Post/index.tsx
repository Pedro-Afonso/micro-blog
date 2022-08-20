import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../shared/hooks/useFetchDocument";

import styles from "./styles.module.css";
import { IPostCollection } from "../../shared/interface/ICollections";

export const Post = () => {
  const { id } = useParams();

  const {
    document: post,
    error,
    loading,
  } = useFetchDocument<IPostCollection>("posts", id);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {post && (
          <div className={styles.content}>
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
