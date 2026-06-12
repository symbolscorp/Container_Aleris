import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventoById } from "../api/eventoApi";
import { createInscripcion } from "../api/inscripcionApi";
import { culqiCobrar } from "../api/culqi";
import { getListInscripciones } from "../api/inscripcionApi";
import { useAuth } from "../context/AuthContext";
import { useGlobal } from "../context/GlobalContext";
import { formatDate } from "../utils/formatDate";
import BottomNavigation from "../components/BottomNavigation";
import { SkeletonCard } from "../components/Loading";
import { getCuentaByDni } from "../api/cuentaApi";
import CanchaVoley from "../components/CanchaVoley";
import Toast from "../components/Toast";
import { useCulqi } from "../hooks/useCulqi";
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
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  const [posicionSeleccionada, setPosicionSeleccionada] = useState(null);
  const [ocupadas, setOcupadas] = useState([]);
  const [participantes, setParticipantes] = useState([]);

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
    fetchOcupadas();
  }, [id]);

  /*
  const fetchOcupadas = async () => {
    try {
      /*
      const res = await fetch(
        `http://192.168.1.11:8080/api/inscripcion/selectAllxEventos/${id}`
      );
      
      const res = await getListInscripciones(id);
      
      const data = await res.json();
      const lista = data.data || [];
      setParticipantes(lista);
      setOcupadas(lista.map((i) => i.numero));
    } catch (err) {
      console.error("Error cargando posiciones ocupadas", err);
    }
  };*/

  const fetchOcupadas = async () => {
  try {

    const res = await getListInscripciones(id);
    const lista = res.data || [];
    setParticipantes(lista);
    setOcupadas(lista.map((i) => i.numero));
  } catch (err) {
    console.error("Error cargando posiciones ocupadas", err);
  }
};
  const handleSeleccionarPosicion = (pos) => {
    setPosicionSeleccionada(prev => (prev === pos ? null : pos));
  };

  // handleInscribirse solo abre el checkout
// Agrega esto (pásale evento cuando ya esté cargado)
  const { culqiListo, abrirCheckout } = useCulqi(evento);

  const handleInscribirse = () => {
    if (!cuenta?.id || !evento?.id) return;
    if (posicionSeleccionada === null) {
      setToast({ message: "Debes seleccionar una posición antes de inscribirte.", type: "error" });
      return;
    }
    // Abre Culqi y cuando devuelva el token, procesa la inscripción
    abrirCheckout(procesarInscripcion);
  };
  const procesarInscripcion = async (token) => {
    setInscribiendose(true);
    try {

      /*
      const pagoRequest = {
        token: token,
        monto: evento.costo,
        email: 'wilmerpllacho@gmail.com'
      };
      const response = await culqiCobrar(pagoRequest)
      */
     // Si no hay token, no proceder
    if (!token) {
      setToast({ message: "No se recibió confirmación del pago.", type: "error" });
      return;
    }

    if (token) { // token llega tanto de tarjeta como de Yape
      const culqiData = await culqiCobrar({
        token: token,
        monto: evento.costo,
        email: usuario.email,
      });
       // cobro exitoso tiene "outcome" con "type": "venta_exitosa"
      if (culqiData.object === "error") {
        setToast({ message: culqiData.user_message || "Error en el pago.", type: "error" });
        return;
      }
    }
   
      // 2. Crear inscripción (igual que tenías)
      const inscripcionRes = await createInscripcion({
        id: 0,
        cuenta: { id: cuenta.id },
        evento: { id: evento.id },
        pago: evento.costo,
        numero: posicionSeleccionada,
        tipo: "Jugador",
        estado: "Inscrito",
      });

      if (inscripcionRes?.status === "Error") {
        setToast({ message: inscripcionRes.message, type: "error" });
        return;
      }

      const cuentaRes = await getCuentaByDni(usuario.dni);
      login(usuario, cuentaRes.data);
      setSuccess(true);
      setToast({ message: "¡Pago e inscripción realizados!", type: "success" });
      await fetchInscripciones(usuario.id);
      setTimeout(() => navigate("/home"), 2500);
    } catch (err) {
      setToast({ message: err.message || "Error al procesar el pago.", type: "error" });
    } finally {
      setInscribiendose(false);
    }
  };
/*
  const handleInscribirse = async () => {
    if (!cuenta?.id || !evento?.id) return;
    if (posicionSeleccionada === null) {
      setToast({ message: "Debes seleccionar una posición en la cancha antes de inscribirte.", type: "error" });
      return;
    }
    setInscribiendose(true);
    try {
      const inscripcionRes = await createInscripcion({
        id: 0,
        cuenta: { id: cuenta.id },
        evento: { id: evento.id },
        pago: evento.costo,
        numero: posicionSeleccionada,
        tipo: "Jugador",
        estado: "Inscrito",
      });

      console.log(inscripcionRes)
      if (inscripcionRes?.status === "Error") {
        setToast({ message: inscripcionRes.message, type: "error" });
        return;
      }
      const cuentaRes = await getCuentaByDni(usuario.dni);
      login(usuario, cuentaRes.data);
      setSuccess(true);
      setToast({ message: "¡Inscripción realizada correctamente! Redirigiendo...", type: "success" });
      await fetchInscripciones(usuario.id);
      setTimeout(() => navigate("/home"), 2500);
    } catch (err) {
      setToast({ message: err.message || "Error al inscribirse.", type: "error" });
    } finally {
      setInscribiendose(false);
    }
  };
*/
  if (loading) return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("/eventos")}>←</button>
        <h1>Detalle del Evento</h1>
      </div>
      <div className="page-content"><SkeletonCard /><SkeletonCard /></div>
    </div>
  );

  if (!evento) return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("/eventos")}>←</button>
        <h1>Error</h1>
      </div>
      <div className="page-content"><div className="form-error">No se pudo cargar el evento.</div></div>
    </div>
  );

  return (
    <div className="page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="detalle-hero">
        <div className="detalle-hero__bg" />
        <button className="back-btn back-btn--light" onClick={() => navigate("/eventos")}>←</button>
        <div className="detalle-hero__content">
          <span className="detalle-hero__ball">🏐</span>
          <h1 className="detalle-hero__title">{evento?.descripcion}</h1>
          <span className={`badge badge--${evento?.estado?.toLowerCase()}`}>{evento?.estado}</span>
        </div>
      </div>

      <div className="detalle-three-col">

        {/* Columna 1: info del evento */}
        <div className="detalle-col detalle-col--info">
          <div className="page-content detalle-content">

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
          </div>
        </div>

        {/* Columna 2: inscritos */}
        <div className="detalle-col detalle-col--participantes">
          <div className="participantes-header">
            <span className="participantes-title">👥 Inscritos</span>
            <span className="participantes-count">
              {participantes.length} / {evento?.integrantes ?? "—"}
            </span>
          </div>

          {participantes.length === 0 ? (
            <div className="participantes-empty">
              <span>🏐</span>
              <p>Sé el primero en inscribirte</p>
            </div>
          ) : (
            <ul className="participantes-list">
              {participantes.map((ins) => {
                const u = ins.cuenta?.usuario;
                return (
                  <li key={ins.id} className="participante-item">
                    <div className="participante-num">
                      <span>{ins.numero}</span>
                    </div>
                    <div className="participante-avatar">
                      {u?.nombre?.[0]}{u?.apellido?.[0]}
                    </div>
                    <div className="participante-info">
                      <span className="participante-nombre">{u?.nombre} {u?.apellido}</span>
                      <span className="participante-apodo">"{u?.apodo}"</span>
                    </div>
                    <div className="participante-nivel">{ins.cuenta?.nivel}</div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Columna 3: cancha + botón */}
        <div className="detalle-col detalle-col--cancha">
          <CanchaVoley
  ocupadas={ocupadas}
  selectedPos={posicionSeleccionada}
  onSelect={handleSeleccionarPosicion}
  totalIntegrantes={evento?.integrantes ?? 0}
  miCuentaId={cuenta?.id}
  participantes={participantes}
  onInscribirse={handleInscribirse}
  inscribiendose={inscribiendose}
  success={success}
/>
          
        </div>

      </div>

      <BottomNavigation />
    </div>
  );
};

export default EventoDetalle;
