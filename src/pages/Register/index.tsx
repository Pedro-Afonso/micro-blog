import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FlashMessage } from "../../shared/components/FlashMessage";
import { useAuthentication } from "../../shared/hooks/useAuthentication";
import styles from "./styles.module.css";

interface IRegisterForm {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { createUser, error: authError } = useAuthentication();

  useEffect(() => {
    setError(authError);
  }, [authError]);

  const onSubmit = async (data: any) => {
    const { displayName, email, password, confirmPassword } = data;

    if (!displayName || !email || !password || !confirmPassword) {
      return setError("Por favor, preencha todos os campos.");
    }

    if (password !== confirmPassword) {
      return setError("As senhas precisam ser iguais");
    }

    await createUser({ displayName, email, password });
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Nome</span>
            <input
              {...register("displayName", { maxLength: 50 })}
              placeholder="Insira o seu nome"
              type="text"
            />
          </label>
          <label>
            <span>Email:</span>
            <input
              {...register("email", { maxLength: 50 })}
              placeholder="Digite o seu email"
              type="email"
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              {...register("password", { maxLength: 50 })}
              placeholder="Crie uma senha"
              type="password"
            />
          </label>
          <label>
            <span>Confirme a senha:</span>
            <input
              {...register("confirmPassword", {
                maxLength: 50,
              })}
              placeholder="Confirme a senha"
              type="password"
            />
          </label>
          <button type="submit">Registrar</button>
          <FlashMessage error={error} />
        </form>
      </div>
    </main>
  );
};
