import { useEffect, useState } from "react";
import "../styles/Toast.css";

/**
 * Toast — ventana flotante de notificación.
 *
 * Props:
 *   message  string         — texto a mostrar
 *   type     "success" | "error"  — estilo del toast
 *   onClose  () => void     — callback al cerrar
 *   duration number         — ms antes de auto-cerrar (default: 3500)
 */
const Toast = ({ message, type = "success", onClose, duration = 3500 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Pequeño delay para que el CSS transition funcione al montar
    const showTimer = setTimeout(() => setVisible(true), 10);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 350); // espera la animación de salida
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  return (
    <div className={`toast toast--${type} ${visible ? "toast--visible" : ""}`} role="alert">
      <span className="toast__icon">
        {type === "success" ? "✅" : "⚠️"}
      </span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={handleClose} aria-label="Cerrar">✕</button>
    </div>
  );
};

export default Toast;
