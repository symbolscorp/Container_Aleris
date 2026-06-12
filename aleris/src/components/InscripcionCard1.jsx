import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import QRModal from "./QRModal";
import "../styles/InscripcionCard.css";

const estadoColor = {
  inscrito: "success",
  "no asistio": "danger",
  pendiente: "warning",
  activo: "success",
};

const InscripcionCard = ({ inscripcion }) => {
  const navigate = useNavigate();
  //const { id, evento, pago, estado } = inscripcion;
  const { id, evento, pago, estado, posiciones = [] } = inscripcion;
  const colorClass = estadoColor[estado?.toLowerCase()] || "default";

  const [showQR, setShowQR] = useState(false);
  const [totalInscritos, setTotalInscritos] = useState(null);

  useEffect(() => {
    if (!evento?.id) return;
    fetch(`http://192.168.1.11:8080/api/inscripcion/selectAllxEventos/${evento.id}`)
      .then((r) => r.json())
      .then((data) => setTotalInscritos(data.data?.length ?? 0))
      .catch(() => setTotalInscritos(null));
  }, [evento?.id]);

  return (
    <>
      <div className="inscripcion-card">

        {/* ── Header ── */}
        <div className="inscripcion-card__header">
          <span className="inscripcion-card__icon">🏐</span>
          <div className="inscripcion-card__title-block">
            <h3 className="inscripcion-card__title">{evento?.descripcion}</h3>
            <span className={`badge badge--${colorClass}`}>{estado}</span>
          </div>
          {totalInscritos !== null && (
            <div className="inscripcion-card__counter" title="Jugadores inscritos">
              <span className="inscripcion-card__counter-num">{totalInscritos}</span>
              <span className="inscripcion-card__counter-label">inscritos</span>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="inscripcion-card__body">
          <div className="inscripcion-card__row">
            <span className="inscripcion-card__meta">📅 {formatDate(evento?.fecha)}</span>
            <span className="inscripcion-card__meta">⏰ {evento?.horainicio} - {evento?.horafin}</span>
          </div>
          <div className="inscripcion-card__row">
            <span className="inscripcion-card__meta">📍 {evento?.cancha?.descripcion}</span>
            <span className="inscripcion-card__meta">👥 {evento?.integrantes} jugadores</span>
          </div>
          {evento?.club && (
            <span className="inscripcion-card__meta" style={{ color: "var(--primary)", fontWeight: 600 }}>
              🏆 {evento.club.descripcion}
            </span>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="inscripcion-card__footer">
          <span className="inscripcion-card__costo">S/{pago}</span>
          <span className={`badge badge--${colorClass}`}>{estado}</span>
        </div>

{/* ── Details ── */}
<div className="inscripcion-card__details">
  <span>📅 {formatDate(evento?.fecha)}</span>
  <span>⏰ {evento?.horainicio} - {evento?.horafin}</span>
  <span>📍 {evento?.cancha?.descripcion}</span>
  <span>💰 S/{pago}</span>
  {posiciones.length > 0 && (
    <span style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
      🎽
      {posiciones.map(n => (
        <span key={n} style={{
          background: "#7c3aed",
          color: "#fff",
          borderRadius: "50%",
          width: "22px",
          height: "22px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: 800,
        }}>
          {n}
        </span>
      ))}
    </span>
  )}
</div>
        {/* ── Actions ── */}
        <div className="inscripcion-card__actions">
          <button className="icard-btn icard-btn--qr" onClick={() => setShowQR(true)}>
            <span className="icard-btn__icon">⬛</span>
            <span>Ver QR</span>
          </button>
          <button className="icard-btn icard-btn--pago">
            <span className="icard-btn__icon">💳</span>
            <span>Pago</span>
          </button>
          <button className="icard-btn icard-btn--evento" onClick={() => navigate(`/evento/${evento?.id}`)}>
            <span className="icard-btn__icon">📋</span>
            <span>Evento</span>
          </button>
          <div className="icard-btn icard-btn--inscritos">
            <span className="icard-btn__icon">👥</span>
            <span>{totalInscritos !== null ? `${totalInscritos}/${evento?.integrantes ?? "?"}` : "..."}</span>
          </div>
        </div>

      </div>

      {showQR && (
        <QRModal
          value={String(id)}
          title={evento?.descripcion}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  );
};

export default InscripcionCard;
