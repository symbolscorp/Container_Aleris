import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventoById } from "../api/eventoApi";
import { createInscripcion } from "../api/inscripcionApi";
import { useAuth } from "../context/AuthContext";
import { useGlobal } from "../context/GlobalContext";
import { formatDate } from "../utils/formatDate";
import BottomNavigation from "../components/BottomNavigation";
import Loading, { SkeletonCard } from "../components/Loading";
import { getCuentaByDni } from "../api/cuentaApi";
import "../styles/EventoDetalle.css";

const EventoDetalle = () => {
  const { id } = useParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { usuario, cuenta } = useAuth();
  const { fetchInscripciones } = useGlobal();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inscribiendose, setInscribiendose] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await getEventoById(id);
        setEvento(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvento();
  }, [id]);

  const handleInscribirse = async () => {
    if (!cuenta?.id || !evento?.id) return;
    setInscribiendose(true);
    setError("");
    try {
      await createInscripcion({
        id: 0,
        cuenta: { id: cuenta.id },
        evento: { id: evento.id },
        pago: evento.costo,
        numero: 1,
        tipo: "Jugador",
        estado: "Inscrito",
      });
      // Volver a consultar la cuenta actualizada
    const cuentaRes = await getCuentaByDni(usuario.dni);
    const cuentaActualizada = cuentaRes.data;

    // Actualizar contexto y localStorage
    login(usuario, cuentaActualizada);
      setSuccess(true);
      await fetchInscripciones(usuario.id);
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      setError(err.message || "Error al inscribirse.");
    } finally {
      setInscribiendose(false);
    }
  };

  if (loading) return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("/eventos")}>←</button>
        <h1>Detalle del Evento</h1>
      </div>
      <div className="page-content"><SkeletonCard /><SkeletonCard /></div>
    </div>
  );

  if (error && !evento) return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("/eventos")}>←</button>
        <h1>Error</h1>
      </div>
      <div className="page-content"><div className="form-error">{error}</div></div>
    </div>
  );

  return (
    <div className="page">
      <div className="detalle-hero">
        <div className="detalle-hero__bg" />
        <button className="back-btn back-btn--light" onClick={() => navigate("/eventos")}>←</button>
        <div className="detalle-hero__content">
          <span className="detalle-hero__ball">🏐</span>
          <h1 className="detalle-hero__title">{evento?.descripcion}</h1>
          <span className={`badge badge--${evento?.estado?.toLowerCase()}`}>{evento?.estado}</span>
        </div>
      </div>

      <div className="page-content detalle-content">
        {success && (
          <div className="success-banner">
            ✅ ¡Inscripción realizada correctamente! Redirigiendo...
          </div>
        )}
        {error && <div className="form-error">⚠️ {error}</div>}

        <div className="detalle-card">
          <div className="detalle-info">
            <div className="detalle-info__item">
              <span className="detalle-info__icon">📅</span>
              <div>
                <span className="detalle-info__label">Fecha</span>
                <span className="detalle-info__value">{formatDate(evento?.fecha)}</span>
              </div>
            </div>
            <div className="detalle-info__item">
              <span className="detalle-info__icon">⏰</span>
              <div>
                <span className="detalle-info__label">Horario</span>
                <span className="detalle-info__value">{evento?.horainicio} - {evento?.horafin}</span>
              </div>
            </div>
            <div className="detalle-info__item">
              <span className="detalle-info__icon">📍</span>
              <div>
                <span className="detalle-info__label">Cancha</span>
                <span className="detalle-info__value">{evento?.cancha?.descripcion}</span>
                <span className="detalle-info__sub">{evento?.cancha?.distrito}, {evento?.cancha?.departamento}</span>
              </div>
            </div>
            <div className="detalle-info__item">
              <span className="detalle-info__icon">👥</span>
              <div>
                <span className="detalle-info__label">Jugadores</span>
                <span className="detalle-info__value">{evento?.integrantes}</span>
              </div>
            </div>
            <div className="detalle-info__item">
              <span className="detalle-info__icon">🏆</span>
              <div>
                <span className="detalle-info__label">Club</span>
                <span className="detalle-info__value">{evento?.club?.descripcion}</span>
              </div>
            </div>
            <div className="detalle-info__item detalle-info__item--highlight">
              <span className="detalle-info__icon">💰</span>
              <div>
                <span className="detalle-info__label">Costo</span>
                <span className="detalle-info__value detalle-info__value--costo">S/{evento?.costo}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn--primary btn--full btn--lg inscribirse-btn"
          onClick={handleInscribirse}
          disabled={inscribiendose || success}
        >
          {inscribiendose ? <><span className="btn-spinner" /> Inscribiendo...</> : "🏐 INSCRIBIRME"}
        </button>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default EventoDetalle;
