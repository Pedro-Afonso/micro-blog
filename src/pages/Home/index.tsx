import { useNavigate } from "react-router-dom";
import { Banner } from "../../shared/components/Banner";
import { Card } from "../../shared/components/Card";
import { MiniCard } from "../../shared/components/MiniCard";
import { useFetchDocuments } from "../../shared/hooks/useFetchDocuments";
import { IPostCollection } from "../../shared/interface/ICollections";
import styles from "./styles.module.css";

interface IFetchDocuments {
  documents: IPostCollection[];
}

export const Home = () => {
  const { documents: posts } = useFetchDocuments("posts") as IFetchDocuments;

  const navigate = useNavigate();

  if (!posts) {
    return <p>Carregando...</p>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div
            onClick={() => {
              navigate(`/post/${posts[0].id}`);
            }}
          >
            <Banner post={posts[0]} />
          </div>
          <div>
            <div className={styles.popular}>
              <span>Popular</span>
            </div>
            {posts.length < 1 ? (
              <button
                onClick={() => {
                  navigate("/post/create");
                }}
              >
                Criar um post
              </button>
            ) : (
              <>
                {posts.slice(1, 4).map((post, key) => (
                  <MiniCard key={key} post={post} />
                ))}
              </>
            )}
          </div>

          <div>
            <div className={styles.recent}>
              <span>Recentes</span>
            </div>

            {posts.length < 1 ? (
              <button
                onClick={() => {
                  navigate("/post/create");
                }}
              >
                Criar um post
              </button>
            ) : (
              <>
                {posts.map((post, key: any) => (
                  <Card key={key} post={post} />
                ))}
              </>
            )}
          </div>
          <div>
            <div className={styles.popular}>
              <span>Categorias</span>
            </div>
            <h4 style={{ textAlign: "center" }}>Em breve...</h4>
          </div>
        </div>
      </div>
    </main>
  );
};
