import { useEffect, useRef } from "react";
import "../styles/QRModal.css";

/**
 * QRModal — muestra un QR generado en canvas con la librería qrcode.
 * Props:
 *   value   string  — dato a codificar (id de inscripción)
 *   title   string  — nombre del evento
 *   onClose () => void
 */
const QRModal = ({ value, title, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Carga qrcode desde CDN y dibuja en canvas
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    script.onload = () => {
      if (canvasRef.current && window.QRCode) {
        canvasRef.current.innerHTML = "";
        new window.QRCode(canvasRef.current, {
          text: value,
          width: 220,
          height: 220,
          colorDark: "#1a1a1a",
          colorLight: "#ffffff",
          correctLevel: window.QRCode.CorrectLevel.H,
        });
      }
    };
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, [value]);

  // Cerrar al tocar fuera
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="qr-backdrop" onClick={handleBackdrop}>
      <div className="qr-modal">
        <button className="qr-modal__close" onClick={onClose}>✕</button>

        <div className="qr-modal__header">
          <span className="qr-modal__emoji">🏐</span>
          <h3 className="qr-modal__title">{title}</h3>
          <p className="qr-modal__sub">Código de inscripción</p>
        </div>

        <div className="qr-modal__canvas-wrap">
          <div ref={canvasRef} className="qr-modal__canvas" />
        </div>

        <div className="qr-modal__id">
          <span className="qr-modal__id-label">ID</span>
          <span className="qr-modal__id-value">#{value}</span>
        </div>

        <p className="qr-modal__hint">Presenta este código en el evento</p>
      </div>
    </div>
  );
};

export default QRModal;
