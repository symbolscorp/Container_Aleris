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
  const { id, evento, pago, estado, posiciones = [] } = inscripcion;
  const colorClass = estadoColor[estado?.toLowerCase()] || "default";

  const [showQR, setShowQR]           = useState(false);
  const [totalInscritos, setTotalInscritos] = useState(null);
/*
  useEffect(() => {
    if (!evento?.id) return;
    fetch(`http://192.168.1.11:9000/api/inscripcion/selectAllxEventos/${evento.id}`)
      .then((r) => r.json())
      .then((data) => setTotalInscritos(data.data?.length ?? 0))
      .catch(() => setTotalInscritos(null));
  }, [evento?.id]);
*/
  return (
    <>
      <div className="inscripcion-card">
        <div className="inscripcion-card__accent" />
        <div className="inscripcion-card__content">

          {/* ── Club banner ── */}
          {evento?.club && (
            <div className="inscripcion-card__club-banner">
              <span className="inscripcion-card__club-icon">🏆</span>
              <span className="inscripcion-card__club-name">{evento.club.descripcion}</span>
            </div>
          )}

          {/* ── Top ── */}
          <div className="inscripcion-card__top">
            <span className="inscripcion-card__icon">🏐</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 className="inscripcion-card__title">{evento?.descripcion}</h3>
              <span className={`badge badge--${colorClass}`}>{estado}</span>
            </div>
            {evento?.inscritos !== null && (
              <div className="inscripcion-card__counter" title="Jugadores inscrito">
                <span className="inscripcion-card__counter-num">{evento?.inscritos !== null ? `${evento?.inscritos}/${evento?.integrantes ?? "?"}` : "..."}</span>
                <span className="inscripcion-card__counter-label">inscritos</span>
              </div>
            )}
          </div>

          {/* ── Details ── */}
<div className="inscripcion-card__details">
  <span>📅 {formatDate(evento?.fecha)}</span>
  <span>⏰ {evento?.horainicio} - {evento?.horafin}</span>
  <span>📍 {evento?.cancha?.descripcion}</span>
  <span>💰 S/{pago}</span>

  {posiciones.length > 0 && (
  <span style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginTop: "2px" }}>
    {posiciones.map(n => (
      <span key={n} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
        <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cuerpo de la camiseta */}
          <path
            d="M9 1 L1 6 L4 10 L7 8 L7 25 L21 25 L21 8 L24 10 L27 6 L19 1 C19 1 17 4 14 4 C11 4 9 1 9 1Z"
            fill="#d38d00"
            stroke="#c08b21"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Número */}
          <text
            x="14"
            y="19"
            textAnchor="middle"
            fill="white"
            fontSize={n >= 10 ? "8" : "10"}
            fontWeight="800"
            fontFamily="monospace"
          >
            {n}
          </text>
        </svg>
      </span>
    ))}
  </span>
)}

</div>

          {/* ── Actions ── */}
          {/* ── Actions ── */}
          <div className="inscripcion-card__actions">
            
            <button className="icard-btn icard-btn--qr" onClick={() => setShowQR(true)} title="Ver código QR">
              <span className="icard-btn__icon">⬛</span>
              <span>QR</span>
            </button>
            <button className="icard-btn icard-btn--pago" title="Ver detalle de pago">
              <span className="icard-btn__icon">💳</span>
              <span>Pago</span>
            </button>
            <button className="icard-btn icard-btn--evento" onClick={() => navigate(`/evento/${evento?.id}`)} title="Ver detalle del evento">
           <span className="icard-btn__icon" style={{ fontSize: "20px", fontWeight: 800, color: "#16a34a" }}>›</span>
              <span>Más detalles</span>
            </button>
          </div>

        </div>
      </div>

      {showQR && (
        <QRModal value={String(id)} title={evento?.descripcion} onClose={() => setShowQR(false)} />
      )}
    </>
  );
};

export default InscripcionCard;
