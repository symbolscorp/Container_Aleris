import { useNavigate } from "react-router-dom";
import "../styles/EmptyState.css";

const EmptyState = ({
  icon = "🏐",
  title = "Sin resultados",
  message = "No hay datos para mostrar.",
  actionLabel,
  actionRoute,
  onAction,
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) return onAction();
    if (actionRoute) navigate(actionRoute);
  };

  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon}</div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      {(actionLabel) && (
        <button className="btn btn--primary" onClick={handleAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
