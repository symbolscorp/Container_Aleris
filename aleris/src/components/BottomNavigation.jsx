import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGlobal } from "../context/GlobalContext";
import "../styles/BottomNavigation.css";

const nav = [
  { path: "/home",    emoji: "🏠", label: "Inicio"  },
  { path: "/eventos", emoji: "🏐", label: "Eventos" },
  { path: "/perfil",  emoji: "👤", label: "Perfil"  },
];

const BottomNavigation = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { logout } = useAuth();
  const { clearInscripciones } = useGlobal();

  const handleLogout = () => {
    logout();
    clearInscripciones();
    navigate("/login");
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__pill">

        {nav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              className={`bottom-nav__item ${active ? "bottom-nav__item--active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <div className="bottom-nav__icon-box">
                <span style={{ fontSize: active ? "22px" : "20px" }}>{item.emoji}</span>
              </div>
              <span className="bottom-nav__label">{item.label}</span>
            </button>
          );
        })}

        <button
          className="bottom-nav__item bottom-nav__item--logout"
          onClick={handleLogout}
        >
          <div className="bottom-nav__icon-box">
            <span style={{ fontSize: "20px" }}>🚪</span>
          </div>
          <span className="bottom-nav__label">Salir</span>
        </button>

      </div>
    </nav>
  );
};

export default BottomNavigation;