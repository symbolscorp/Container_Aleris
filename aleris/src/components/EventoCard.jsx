import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "../styles/EventoCard.css";

const EventoCard = ({ evento }) => {
  const navigate = useNavigate();

  return (
    <div className="evento-card" onClick={() => navigate(`/evento/${evento.id}`)}>
      <div className="evento-card__header">
        <span className="evento-card__icon">🏐</span>
        <div className="evento-card__title-block">
          <h3 className="evento-card__title">{evento.descripcion}</h3>
          <span className={`badge badge--estado badge--${evento.estado?.toLowerCase()}`}>
            {evento.estado}
          </span>
        </div>
      </div>

      <div className="evento-card__body">
        <div className="evento-card__row">
          <span className="evento-card__meta">📅 {formatDate(evento.fecha)}</span>
          <span className="evento-card__meta">⏰ {evento.horainicio} - {evento.horafin}</span>
        </div>
        <div className="evento-card__row">
          <span className="evento-card__meta">📍 {evento.cancha?.descripcion}</span>
          <span className="evento-card__meta">👥 {evento.inscritos}/{evento.integrantes} jugadores</span>
        </div>
        {evento.club && (
          <span className="evento-card__club">🏆 {evento.club.descripcion}</span>
        )}
      </div>

      <div className="evento-card__footer">
  <span className="evento-card__costo">S/{evento.costo}</span>

  {/* ── Cupos disponibles ── */}
  {(() => {
    const disponibles = evento.integrantes - evento.inscritos;
    const agotado = disponibles === 0;
    return (
      <span className={`evento-card__cupos ${agotado ? "evento-card__cupos--agotado" : disponibles <= 3 ? "evento-card__cupos--pocos" : ""}`}>
        {agotado ? "🔴 Completo" : `🟢 ${disponibles} cupos`}
      </span>
    );
  })()}

  <button className="btn btn--outline btn--sm">Ver Detalle →</button>
</div>
    </div>
  );
};

export default EventoCard;
