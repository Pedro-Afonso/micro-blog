import { useNavigate } from "react-router-dom";
import { Banner } from "../../shared/components/Banner";
import { Card } from "../../shared/components/Card";
import { MiniCard } from "../../shared/components/MiniCard";
import { useFetchDocuments } from "../../shared/hooks/useFetchDocuments";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";
import { IPostCollection } from "../../shared/interface/ICollections";
import styles from "./styles.module.css";

interface IFetchDocuments {
  documents: IPostCollection[];
}

export const Home = () => {
  const { documents: posts } = useFetchDocuments("posts") as IFetchDocuments;

  const navigate = useNavigate();

  const isSmall = useMediaQuery("(max-width: 992px)");

  if (!posts) {
    return <p>Carregando...</p>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div
            className={styles.banner}
            onClick={() => {
              navigate(`/post/${posts[0].id}`);
            }}
          >
            <Banner post={posts[0]} />
          </div>
          {!isSmall && (
            <div className={styles.popular}>
              <div>
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
          )}

          <div className={styles.recent}>
            <div>
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
          {!isSmall && (
            <div className={styles.category}>
              <div>
                <span>Categorias</span>
              </div>
              <h4 style={{ textAlign: "center" }}>Em breve...</h4>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
