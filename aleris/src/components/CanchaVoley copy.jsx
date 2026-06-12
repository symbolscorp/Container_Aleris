import { useState } from "react";
import "../styles/CanchaVoley.css";

/**
 * CanchaVoley — Visual volleyball court with 12 selectable positions.
 *
 * Props:
 *  - ocupadas: number[]  — array of position numbers already taken (e.g. [1, 5, 9])
 *  - onSelect: (pos: number) => void — callback when a position is clicked
 *  - selectedPos: number | null — currently selected position
 */
const CanchaVoley = ({ ocupadas = [], onSelect, selectedPos }) => {
  // Lado A: positions 1-6, Lado B: positions 7-12
  // Standard volleyball rotation layout (3 cols × 2 rows per side)
  //  Row near net → positions 2,3,4  (front row)
  //  Row far end  → positions 1,6,5  (back row)
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

  const getStatus = (num) => {
    if (ocupadas.includes(num)) return "ocupada";
    if (selectedPos === num) return "selected";
    return "libre";
  };

  const renderPosition = (pos) => {
    const status = getStatus(pos.num);
    return (
      <button
        key={pos.num}
        className={`cancha-pos cancha-pos--${status}`}
        onClick={() => status !== "ocupada" && onSelect?.(pos.num)}
        disabled={status === "ocupada"}
        title={
          status === "ocupada"
            ? `Posición ${pos.num} — Ocupada`
            : `Posición ${pos.num} — Disponible`
        }
        aria-label={`Posición ${pos.num}`}
      >
        <span className="cancha-pos__num">{pos.num}</span>
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

      <div className="cancha-court">
        {/* Corner markers */}
        <div className="court-corner court-corner--tl" />
        <div className="court-corner court-corner--tr" />
        <div className="court-corner court-corner--bl" />
        <div className="court-corner court-corner--br" />

        {/* Lado A */}
        <div className="court-side court-side--a">
          <span className="court-side__label">LADO A</span>
          <div className="court-positions">
            {ladoA.map(renderPosition)}
          </div>
        </div>

        {/* Net */}
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
          <span className="court-side__label">LADO B</span>
          <div className="court-positions">
            {ladoB.map(renderPosition)}
          </div>
        </div>
      </div>

      {/* Legend */}
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
      </div>

      {selectedPos && (
        <div className="cancha-selected-info">
          <span>📍 Posición <strong>{selectedPos}</strong> seleccionada</span>
        </div>
      )}
    </div>
  );
};

export default CanchaVoley;
