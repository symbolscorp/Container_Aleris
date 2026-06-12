import { useAuth } from "../context/AuthContext";
import "../styles/UserHeader.css";

const UserHeader = () => {
  const { usuario, cuenta } = useAuth();
  if (!usuario || !cuenta) return null;

  return (
    <div className="user-header">
      <div className="user-header__avatar">
        <span>{usuario.nombre?.[0]}{usuario.apellido?.[0]}</span>
      </div>
      <div className="user-header__info">
        <h2 className="user-header__greeting">
          Hola, <span>{usuario.nombre}</span> 👋
        </h2>
        <p className="user-header__apodo">@{usuario.apodo || usuario.nombre}</p>
      </div>
      <div className="user-header__badge">
        <span className="badge badge--nivel">{cuenta.nivel}</span>
      </div>
      <div className="user-header__stats">
        <div className="stat">
          <span className="stat__value">{cuenta.puntos}</span>
          <span className="stat__label">Puntos</span>
        </div>
        <div className="stat__divider" />
        <div className="stat">
          <span className="stat__value">{cuenta.visitas}</span>
          <span className="stat__label">Visitas</span>
        </div>
        <div className="stat__divider" />
        <div className="stat">
          <span className="stat__value">{cuenta.posicion}</span>
          <span className="stat__label">Posición</span>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
