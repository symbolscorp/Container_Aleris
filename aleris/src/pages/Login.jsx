import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUsuarioByDni } from "../api/usuarioApi";
import { getCuentaByDni } from "../api/cuentaApi";
import { posicionGlobal } from "../api/usuarioApi";
import "../styles/Login.css";

const Login = () => {
  const navigate  = useNavigate();
  const { login } = useAuth();
  const [dni, setDni]         = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [resumen, setResumen] = useState(null);

  useEffect(() => {
  posicionGlobal()
    .then((d) => setResumen(d.data))
    .catch(() => {});
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!dni.trim()) { setError("Por favor ingresa tu DNI."); return; }
    setLoading(true);
    
    setError("");
    try {
      const usuarioRes = await getUsuarioByDni(dni.trim());
      const usuario    = usuarioRes.data;
      const cuentaRes  = await getCuentaByDni(dni.trim());
      const cuenta     = cuentaRes.data;
      login(usuario, cuenta);
      navigate("/home");
    } catch {
      setError("Usuario no existe. ¿Deseas registrarte?");
    } finally {
      setLoading(false);
    }
  };

const VoleyLoader = () => (
  <div className="voley-overlay">
    <div className="voley-stage">
      <div className="voley-ball">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="bc">
              <circle cx="50" cy="50" r="47"/>
            </clipPath>
          </defs>
          <circle cx="50" cy="50" r="47" fill="#f2eeea"/>
          <g clipPath="url(#bc)">
            <path d="M50,3 C62,3 80,12 88,28 C78,22 64,20 52,26 C38,33 28,46 26,62 C22,50 24,36 32,24 C38,14 44,3 50,3 Z" fill="#d63b22"/>
            <path d="M88,28 C94,38 97,50 94,63 C88,56 80,52 70,52 C58,52 46,58 40,70 C36,64 36,56 40,48 C44,38 52,30 62,26 C70,23 80,24 88,28 Z" fill="#2e8b4a"/>
            <path d="M94,63 C90,76 80,88 66,94 C54,99 40,98 28,92 C36,88 46,86 56,88 C68,90 78,84 84,74 C88,68 92,66 94,63 Z" fill="#d63b22"/>
            <path d="M28,92 C18,86 10,76 6,64 C10,70 18,74 28,72 C40,70 50,60 52,48 C56,56 56,66 52,74 C46,84 38,90 28,92 Z" fill="#2e8b4a"/>
            <path d="M6,64 C3,56 3,44 6,36 C8,28 14,20 22,14 C18,22 18,32 22,40 C26,50 34,58 44,62 C36,66 26,66 18,62 C12,60 8,62 6,64 Z" fill="#2e8b4a"/>
            <path d="M22,14 C28,8 36,4 44,3 C48,2 52,2 56,3 C50,7 44,12 40,18 C34,28 34,40 40,50 C32,46 26,38 24,28 C22,22 22,18 22,14 Z" fill="#d63b22"/>
            <path d="M52,26 C64,20 78,22 88,28 C80,24 70,23 62,26 C52,30 44,38 40,48 C36,56 36,64 40,70 C34,62 32,52 34,42 C36,34 42,28 52,26 Z" fill="#f2eeea"/>
            <path d="M40,70 C46,58 58,52 70,52 C80,52 88,56 94,63 C90,68 84,74 78,78 C68,84 56,84 48,78 C44,76 40,72 40,70 Z" fill="#f2eeea"/>
            <ellipse cx="34" cy="24" rx="9" ry="5" fill="rgba(255,255,255,0.32)" transform="rotate(-40 34 24)"/>
          </g>
          <circle cx="50" cy="50" r="47" fill="none" stroke="#b0a090" strokeWidth="1.5"/>
        </svg>
      </div>
      <div className="voley-shadow"/>
    </div>
    <p className="voley-label">
      Cargando<span className="voley-dots">
        <span>.</span><span>.</span><span>.</span>
      </span>
    </p>
    <div className="voley-line"/>
  </div>
);

  return (
    <div className="login-screen">
      {loading && <VoleyLoader />} 
      <div className="login-bg" />
      <div className="login-container">

        {/* ── Logo ── */}
        <div className="login-logo">
          <span className="login-ball">🏐</span>
          <h1 className="login-brand">Aleris</h1>
          <p className="login-tagline">Voley Club</p>
        </div>

        {/* ── Promo card ── */}
        {resumen && (
          <div className="login-promo">
            <div className="login-promo__tag">Únete hoy</div>
            <p className="login-promo__headline">
              La comunidad de vóley más activa de Arequipa
            </p>
            <p className="login-promo__sub">
              Encuentra tu club, elige tu posición y compite en los mejores eventos de la ciudad.
            </p>
            <div className="login-promo__stats">
              <div className="login-promo__stat">
                <span className="login-promo__stat-icon">🏐</span>
                <span className="login-promo__stat-val">{resumen.cantidadEventos}</span>
                <span className="login-promo__stat-lbl">Eventos</span>
              </div>
              <div className="login-promo__stat">
                <span className="login-promo__stat-icon">👥</span>
                <span className="login-promo__stat-val">{resumen.cantidadUsuarios}</span>
                <span className="login-promo__stat-lbl">Jugadores</span>
              </div>
              <div className="login-promo__stat">
                <span className="login-promo__stat-icon">🏆</span>
                <span className="login-promo__stat-val">{resumen.cantidadClubes}</span>
                <span className="login-promo__stat-lbl">Clubes</span>
              </div>
              <div className="login-promo__stat">
                <span className="login-promo__stat-icon">🏟️</span>
                <span className="login-promo__stat-val">{resumen.cantidadCanchas}</span>
                <span className="login-promo__stat-lbl">Canchas</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Form ── */}
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-form__title">Bienvenido de vuelta</h2>
          <p className="login-form__subtitle">Ingresa con tu DNI para continuar</p>

          <div className="form-group">
            <label className="form-label">DNI</label>
            <input
              className="form-input"
              type="text"
              placeholder="Ej: 47503762"
              value={dni}
              maxLength={8}
              onChange={(e) => { setDni(e.target.value.replace(/\D/g, "")); setError(""); }}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="form-error">
              <span>⚠️ {error}</span>
              {error.includes("registrarte") && (
                <button type="button" className="btn btn--link" onClick={() => navigate("/register")}>
                  Registrarme →
                </button>
              )}
            </div>
          )}

          <button className="btn btn--primary btn--full" type="submit" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : "Ingresar"}
          </button>
          <div className="login-divider"><span>o</span></div>
          <button className="btn btn--secondary btn--full" type="button" onClick={() => navigate("/register")} disabled={loading}>
            Registrarme
          </button>
        </form>
        <p className="login-footer">Aleris Voley Club © 2026...</p>
      </div>
    </div>
  );
};

export default Login;
