import { card } from "./styles.module.css";

interface IFlashMessageProps {
  error?: string | null;
  message?: string | null;
}

export const FlashMessage: React.FC<IFlashMessageProps> = ({
  error,
  message,
}) => {
  if (!message && !error) {
    return <></>;
  }

  return (
    <div className={card}>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};
