import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./styles.module.css";

export const Navbar = () => {
  const { logout } = useAuthentication();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          MicroBlog
        </h1>
        <nav>
          <ul>
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              Inicial
            </li>
            {user ? (
              <li
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Publicações
              </li>
            ) : (
              <></>
            )}
            {user ? (
              <li
                onClick={() => {
                  logout();
                }}
              >
                Sair
              </li>
            ) : (
              <>
                <li
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Cadastrar
                </li>
                <li
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Entrar
                </li>
              </>
            )}
            <li
              onClick={() => {
                navigate("/about");
              }}
            >
              Sobre
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
