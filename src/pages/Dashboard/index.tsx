import { Link } from "react-router-dom";
import { FlashMessage } from "../../shared/components/FlashMessage";
import { useAuthContext } from "../../shared/context/AuthContext";
import { useFetchDocuments } from "../../shared/hooks/useFetchDocuments";
import { useFirestore } from "../../shared/hooks/useFirestore";
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import styles from "./styles.module.css";

export const Dashboard = () => {
  const { user } = useAuthContext();
  const { deleteDocument, response } = useFirestore("posts");

  const {
    documents: posts,
    error,
    loading,
  } = useFetchDocuments("posts", null, user?.uid);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <FlashMessage
          error={response.error || error}
          isLoading={response.loading}
          message={response.success ? "Post excluído com sucesso!" : null}
        />
        {posts && (
          <div className={styles.table}>
            <div>
              <div>Título:</div>
              <div>Criado em:</div>
              <div>Ações:</div>
            </div>

            {posts.map((post: any) => (
              <div key={post.id}>
                <div>{post.title}</div>
                <div>
                  {new Date(
                    post.createdAt.seconds * 1000 +
                      post.createdAt.nanoseconds / 1000
                  ).toLocaleDateString()}
                </div>
                <div className={styles.actions}>
                  <Link to={`/post/${post.id}`}>
                    <HiOutlineEye />
                  </Link>
                  <Link to={`/post/edit/${post.id}`}>
                    <HiOutlinePencil />
                  </Link>
                  <Link to="" onClick={() => deleteDocument(post.id)}>
                    <HiOutlineTrash />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
