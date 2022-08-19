import { useNavigate } from "react-router-dom";
import { IPostCollection } from "../../interface/ICollections";
import { container, text, image } from "./styles.module.css";

interface IMiniCardProps {
  post: IPostCollection;
}

export const MiniCard: React.FC<IMiniCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const background = post.image;
  return (
    <div onClick={() => navigate(`/post/${post.id}`)} className={container}>
      <div
        className={image}
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className={text}>
        <div>
          <h2>{post.title}</h2>
          <h3>por: {post.createdBy}</h3>
        </div>
      </div>
    </div>
  );
};
