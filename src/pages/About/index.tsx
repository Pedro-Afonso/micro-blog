import { main, container } from "./styles.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();

  return (
    <div className={main}>
      <div className={container}>
        <div>
          <h2>Sobre o MicroBlog</h2>
          <p>
            Este projeto foi criado com o React no front-end e firebase no
            back-end
          </p>
          <button
            onClick={() => {
              navigate("/post/create");
            }}
          >
            Criar um post
          </button>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/pedro-a-fonso/"
                target="_blank"
              >
                <FaLinkedin size={25} />
              </a>
            </li>
            <li>
              <a href="https://github.com/pedro-afonso" target="_blank">
                <FaGithub size={25} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
