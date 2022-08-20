import styles from "./styles.module.css";

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
    <div className={styles.card}>
      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.danger}>{error}</p>}
      {isLoading && <p className={styles.loading}>Carregando...</p>}
    </div>
  );
};
