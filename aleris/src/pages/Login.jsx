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

  return (
    <div className="login-screen">
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

        <p className="login-footer">Aleris Voley Club © 2026</p>
      </div>
    </div>
  );
};

export default Login;
