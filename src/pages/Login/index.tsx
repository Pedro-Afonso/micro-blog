import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FlashMessage } from "../../shared/components/FlashMessage";
import { useAuthContext } from "../../shared/context/AuthContext";
import { useAuthentication } from "../../shared/hooks/useAuthentication";
import { main, container } from "./styles.module.css";

export const Login = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { login, error: authError } = useAuthentication();

  useEffect(() => {
    setError(authError);
  }, [authError]);

  useEffect(() => {
    if (formState.errors && Object.keys(formState.errors).length !== 0) {
      setError("Por favor, preencha todos os campos!");
    }
  }, [formState]);

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    await login({ email, password });
  };

  return (
    <main className={main}>
      <div className={container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Email:</span>
            <input
              {...register("email", { required: true, maxLength: 50 })}
              placeholder="Insira seu email"
              type="email"
            />
          </label>
          <label>
            <span>Password:</span>
            <input
              {...register("password", { required: true, maxLength: 50 })}
              placeholder="Insira sua senha"
              type="password"
            />
          </label>
          <button type="submit">Entrar</button>
          <FlashMessage error={error} />
        </form>
      </div>
    </main>
  );
};
