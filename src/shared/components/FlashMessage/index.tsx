import { card, success, danger, loading } from "./styles.module.css";

interface IFlashMessageProps {
  error?: string | null;
  message?: string | null;
  isLoading?: boolean;
}

export const FlashMessage: React.FC<IFlashMessageProps> = ({
  error,
  message,
  isLoading,
}) => {
  if (!message && !error && !isLoading) {
    return <></>;
  }

  return (
    <div className={card}>
      {message && <p className={success}>{message}</p>}
      {error && <p className={danger}>{error}</p>}
      {isLoading && <p className={loading}>Carregando...</p>}
    </div>
  );
};
