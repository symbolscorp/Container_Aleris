import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";
import BottomNavigation from "../components/BottomNavigation";
import "../styles/Perfil.css";

const Perfil = () => {
  const navigate = useNavigate();
  const { usuario, cuenta } = useAuth();

  const fields = [
    { label: "Nombre", value: usuario?.nombre, icon: "👤" },
    { label: "Apellido", value: usuario?.apellido, icon: "👤" },
    { label: "Apodo", value: usuario?.apodo, icon: "🎯" },
    { label: "DNI", value: usuario?.dni, icon: "🪪" },
    { label: "Fecha de Nacimiento", value: formatDate(usuario?.nacimiento), icon: "🎂" },
    { label: "Género", value: usuario?.genero || "No especificado", icon: "⚧" },
  ];

  const deportiveFields = [
    { label: "Nivel", value: cuenta?.nivel, icon: "📊" },
    { label: "Posición", value: cuenta?.posicion, icon: "🏐" },
    { label: "Puntos", value: cuenta?.puntos, icon: "⭐" },
    { label: "Visitas", value: cuenta?.visitas, icon: "📅" },
  ];

  return (
    <div className="page">
      <div className="perfil-hero">
        <div className="perfil-hero__bg" />
        <button className="back-btn back-btn--light" onClick={() => navigate("/home")}>←</button>
        <div className="perfil-hero__avatar">
          <span>{usuario?.nombre?.[0]}{usuario?.apellido?.[0]}</span>
        </div>
        <h1 className="perfil-hero__name">{usuario?.nombre} {usuario?.apellido}</h1>
        <p className="perfil-hero__apodo">@{usuario?.apodo}</p>
        <div className="perfil-hero__badges">
          <span className="badge badge--nivel">{cuenta?.nivel}</span>
          <span className="badge badge--posicion">{cuenta?.posicion}</span>
        </div>
      </div>

      <div className="page-content">
        <div className="perfil-stats">
          <div className="perfil-stat">
            <span className="perfil-stat__value">{cuenta?.puntos}</span>
            <span className="perfil-stat__label">Puntos</span>
          </div>
          <div className="perfil-stat__divider" />
          <div className="perfil-stat">
            <span className="perfil-stat__value">{cuenta?.visitas}</span>
            <span className="perfil-stat__label">Visitas</span>
          </div>
        </div>

        <div className="perfil-section">
          <h3 className="perfil-section__title">👤 Datos Personales</h3>
          <div className="perfil-fields">
            {fields.map((f) => (
              <div key={f.label} className="perfil-field">
                <span className="perfil-field__icon">{f.icon}</span>
                <div>
                  <span className="perfil-field__label">{f.label}</span>
                  <span className="perfil-field__value">{f.value || "—"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="perfil-section">
          <h3 className="perfil-section__title">🏐 Datos Deportivos</h3>
          <div className="perfil-fields">
            {deportiveFields.map((f) => (
              <div key={f.label} className="perfil-field">
                <span className="perfil-field__icon">{f.icon}</span>
                <div>
                  <span className="perfil-field__label">{f.label}</span>
                  <span className="perfil-field__value">{f.value || "—"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Perfil;
