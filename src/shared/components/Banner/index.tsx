import { IPostCollection } from "../../interface/ICollections";
import { container, card } from "./styles.module.css";

interface IBannerProps {
  post: IPostCollection;
}

export const Banner: React.FC<IBannerProps> = ({ post }) => {
  const background = post.image;

  return (
    <div className={container}>
      <div className={card} style={{ backgroundImage: `url(${background})` }}>
        <div>
          <h4>Categoria (em breve)</h4>
          <h2>{post.title}</h2>
          <h3>por: {post.createdBy}</h3>
        </div>
      </div>
    </div>
  );
};
