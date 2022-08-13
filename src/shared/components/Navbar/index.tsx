import { navbar, container } from "./styles.module.css";

export const Navbar = () => {
  return (
    <header className={navbar}>
      <div className={container}>
        <h1>MicroBlog</h1>
        <nav>
          <ul>
            <li>Inicial</li>
            <li>Entrar</li>
            <li>Sobre</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
