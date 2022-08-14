import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../shared/hooks/useAuthentication";
import { main, container } from "./styles.module.css";

interface IRegisterForm {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const { createUser } = useAuthentication();

  const onSubmit = async (data: any) => {
    const { displayName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    const res = await createUser({ displayName, email, password });
    console.log(res)
  };

  return (
    <main className={main}>
      <div className={container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Nome</span>
            <input
              {...register("displayName", { required: true, maxLength: 50 })}
              placeholder="Insira o seu nome"
              type="text"
            />
          </label>
          <label>
            <span>Email:</span>
            <input
              {...register("email", { required: true, maxLength: 50 })}
              placeholder="Digite o seu email"
              type="email"
            />
          </label>
          <label>
            <span>Senha:</span>
            <input
              {...register("password", { required: true, maxLength: 50 })}
              placeholder="Crie uma senha"
              type="password"
            />
          </label>
          <label>
            <span>Confirme a senha:</span>
            <input
              {...register("confirmPassword", {
                required: true,
                maxLength: 50,
              })}
              placeholder="Confirme a senha"
              type="password"
            />
          </label>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </main>
  );
};
