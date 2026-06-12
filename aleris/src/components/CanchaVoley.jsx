import { useState } from "react";
import "../styles/CanchaVoley.css";

/**
 * CanchaVoley — Visual volleyball court with up to 18 selectable positions.
 *
 * Props:
 *  - ocupadas: number[]      — array of position numbers already taken (e.g. [1, 5, 9])
 *  - onSelect: (pos) => void — callback when a position is clicked
 *  - selectedPos: number | null — currently selected position
 *  - totalIntegrantes: number — total players in the group; bench (13-18) only
 *                               activates when this value equals 18
 */
//const CanchaVoley = ({ ocupadas = [], onSelect, selectedPos, totalIntegrantes = 0, miCuentaId, participantes = [] }) => {
 const CanchaVoley = ({ ocupadas = [], onSelect, selectedPos, totalIntegrantes = 0, miCuentaId, participantes = [], onInscribirse, inscribiendose, success }) => {  
  const bancaActiva = totalIntegrantes === 18;
  const ladoA = [
    { num: 4, col: 1, row: 1 },
    { num: 3, col: 2, row: 1 },
    { num: 2, col: 3, row: 1 },
    { num: 5, col: 1, row: 2 },
    { num: 6, col: 2, row: 2 },
    { num: 1, col: 3, row: 2 },
  ];

  const ladoB = [
    { num: 7,  col: 1, row: 1 },
    { num: 8,  col: 2, row: 1 },
    { num: 9,  col: 3, row: 1 },
    { num: 10, col: 1, row: 2 },
    { num: 11, col: 2, row: 2 },
    { num: 12, col: 3, row: 2 },
  ];

  // Bench: 3 left (13-15), 3 right (16-18)
  const bancaIzquierda = [13, 14, 15];
  const bancaDerecha   = [16, 17, 18];

  // Posiciones que pertenecen a mi cuenta
  const misPosiciones = participantes
    .filter(p => p.cuenta?.id === miCuentaId)
    .map(p => p.numero);
  const esMia = (num) => misPosiciones.includes(num);

  const getStatus = (num) => {
    if (esMia(num)) return "mia"; 
    if (ocupadas.includes(num)) return "ocupada";
    if (selectedPos === num) return "selected";
    return "libre";
  };

 const renderPosition = (num, isBench = false) => {
  const status = getStatus(num);
  const baseClass = isBench ? "cancha-pos cancha-pos--bench" : "cancha-pos";
  return (
    <button
      key={num}
      className={`${baseClass} cancha-pos--${status}`}
      onClick={() => status !== "ocupada" && status !== "mia" && onSelect?.(num)}
      disabled={status === "ocupada" || status === "mia"}
      title={
        status === "mia"      ? `Posición ${num} — Tu posición` :
        status === "ocupada"  ? `Posición ${num} — Ocupada` :
                                `Posición ${num} — Disponible`
      }
      aria-label={`Posición ${num}`}
    >
      <span className="cancha-pos__num">{num}</span>
      {status === "mia"     && <span className="cancha-pos__icon">👤</span>}
      {status === "ocupada" && <span className="cancha-pos__icon">●</span>}
      {status === "selected" && <span className="cancha-pos__icon">★</span>}
    </button>
  );
};

  return (
    <div className="cancha-wrapper">
      <div className="cancha-header">
        <span className="cancha-label">Cancha de Vóley</span>
        <span className="cancha-sublabel">Selecciona tu posición</span>
      </div>

      {/* Banner: ya inscrito */}
{misPosiciones.length > 0 && (
  <div className="cancha-inscrito-banner">
    <span className="cancha-inscrito-banner__title">✅ Ya estás inscrito</span>
    <div className="cancha-inscrito-banner__numeros">
      {misPosiciones.map(n => (
        <div key={n} className="cancha-inscrito-banner__num">
          <span>{n}</span>
        </div>
      ))}
    </div>
  </div>
)}

      <div className="cancha-layout">
        {/* Banca izquierda — posiciones 13, 14, 15 (solo con 18 integrantes) */}
        {bancaActiva && (
          <div className="cancha-bench cancha-bench--left">
            <span className="bench-label">Equipo C</span>
            <div className="bench-positions">
              {bancaIzquierda.map((n) => renderPosition(n, true))}
            </div>
          </div>
        )}

        {/* Cancha principal */}
        <div className="cancha-court">
          {/* Corner markers */}
          <div className="court-corner court-corner--tl" />
          <div className="court-corner court-corner--tr" />
          <div className="court-corner court-corner--bl" />
          <div className="court-corner court-corner--br" />

          {/* Lado A */}
          <div className="court-side court-side--a">
            <span className="court-side__label">Equipo A</span>
            <div className="court-positions">
              {ladoA.map((p) => renderPosition(p.num))}
            </div>
          </div>

          {/* Red */}
          <div className="court-net">
            <div className="net-post net-post--top" />
            <div className="net-body">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="net-stripe" />
              ))}
            </div>
            <div className="net-post net-post--bottom" />
            <div className="net-antenna net-antenna--left" />
            <div className="net-antenna net-antenna--right" />
          </div>

          {/* Lado B */}
          <div className="court-side court-side--b">
            <span className="court-side__label">Equipo B</span>
            <div className="court-positions">
              {ladoB.map((p) => renderPosition(p.num))}
            </div>
          </div>
        </div>

        {/* Banca derecha — posiciones 16, 17, 18 (solo con 18 integrantes) */}
        {bancaActiva && (
          <div className="cancha-bench cancha-bench--right">
            <span className="bench-label">Equipo C</span>
            <div className="bench-positions">
              {bancaDerecha.map((n) => renderPosition(n, true))}
            </div>
          </div>
        )}
      </div>

      {/* Leyenda */}
      <div className="cancha-legend">
        <div className="legend-item">
          <div className="legend-dot legend-dot--libre" />
          <span>Disponible</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot legend-dot--selected" />
          <span>Seleccionada</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot legend-dot--ocupada" />
          <span>Ocupada</span>
        </div>
        {bancaActiva && (
          <div className="legend-item">
            <div className="legend-dot legend-dot--bench" />
            <span>Banca</span>
          </div>
        )}
        {misPosiciones.length > 0 && (
  <div className="legend-item">
    <div className="legend-dot legend-dot--mia" />
    <span>Mi posición</span>
  </div>
)}
      </div>

      {selectedPos && (
        <div className="cancha-selected-info">
          <span>
            📍 Posición <strong>{selectedPos}</strong>{" "}
            {selectedPos <= 6
              ? "(Lado A)"
              : selectedPos <= 12
              ? "(Lado B)"
              : selectedPos <= 15
              ? "(Banca izquierda)"
              : "(Banca derecha)"}
          </span>
        </div>
      )}
       {/* Botón inscribirse */}
      {onInscribirse && (
        <button
          className="btn btn--primary btn--full btn--lg cancha-inscribirse-btn"
          onClick={onInscribirse}
          disabled={inscribiendose || success}
        >
          {inscribiendose
            ? <><span className="btn-spinner" /> Inscribiendo...</>
            : "🏐 INSCRIBIRME"}
        </button>
      )}
    </div>
  );
};

export default CanchaVoley;
