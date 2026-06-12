import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUsuario } from "../api/usuarioApi";
import { createCuenta } from "../api/cuentaApi";
import { getCurrentDateFormatted, getCurrentDateISO } from "../utils/formatDate";
import usePhoneAuth from "../hooks/usePhoneAuth";
import PhoneVerificationStep from "../components/PhoneVerificationStep";
import "../styles/Register.css";

const NIVELES    = ["Principiante", "Básico", "Intermedio", "Avanzado", "Competitivo"];
const POSICIONES = ["Armador", "Central", "Punta", "Opuesto", "Libero", "Universal"];
const GENEROS    = ["Masculino", "Femenino", "Otro"];

const initialForm = {
  nombre: "", apellido: "", nacimiento: "", apodo: "",
  dni: "", genero: "", nivel: "", posicion: "", telefono: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [step, setStep]       = useState(1);

  const {
    sendCode, verifyCode, resetAuth,
    codeSent, verified, sending, verifying, phoneError,
  } = usePhoneAuth();

  // ── Field change ──────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // ── Validation ────────────────────────────────────
  const validateStep1 = () => {
    const { nombre, apellido, nacimiento, apodo, dni, genero, telefono } = form;
    if (!nombre || !apellido || !nacimiento || !apodo || !dni || !telefono || !genero) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    if (dni.length !== 8)      { setError("El DNI debe tener 8 dígitos.");      return false; }
    if (telefono.length !== 9) { setError("El teléfono debe tener 9 dígitos."); return false; }
    return true;
  };

  const validateStep2 = () => {
    if (!form.nivel || !form.posicion) {
      setError("Selecciona tu nivel y posición.");
      return false;
    }
    return true;
  };

  // ── Navigation ────────────────────────────────────
  const handleNext = () => { if (validateStep1()) { setError(""); setStep(2); } };

  const handleGoToVerify = () => { if (validateStep2()) { setError(""); setStep(3); } };

  const handleBack = () => {
    if (step === 3) { resetAuth(); setStep(2); }
    else if (step === 2) { setStep(1); }
    else { navigate("/login"); }
  };

  // ── Create account in backend ─────────────────────
  // Declared BEFORE the useEffect that calls it
  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const usuarioRes = await createUsuario({
        id: 0,
        nombre:     form.nombre,
        apellido:   form.apellido,
        nacimiento: form.nacimiento,
        apodo:      form.apodo,
        registro:   getCurrentDateISO(),
        dni:        form.dni,
        genero:     form.genero,
        telefono:   form.telefono,
      });

       // Validar respuesta antes de crear cuenta
      if (usuarioRes?.status === "Error") {
        setError(usuarioRes.message);
        return;
      }


      await createCuenta({
        id: 0,
        inscripcion: getCurrentDateFormatted(),
        visitas:  "0",
        puntos:   "0",
        nivel:    form.nivel,
        posicion: form.posicion,
        usuario:  { id: usuarioRes.data.id },
      });

      navigate("/login");
    } catch (err) {
      setError(err.message || "Error al registrar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // ── Auto-submit when Firebase confirms the phone ──
  // useEffect reacts to `verified` changing to true — no hoisting issue
  useEffect(() => {
    if (verified) handleRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verified]);

  // ── Firebase callbacks ────────────────────────────
  const handleSendCode   = (e164) => sendCode(e164);
  const handleVerifyCode = (code) => verifyCode(code);

  // ── Step labels ───────────────────────────────────
  const stepLabels = [
    { num: 1, label: "Datos Personales" },
    { num: 2, label: "Datos Deportivos" },
    { num: 3, label: "Verificación" },
  ];

  return (
    <div className="register-screen">
      <div className="register-bg" />
      <div className="register-container">

        <button className="register-back" onClick={handleBack}>
          ← {step > 1 ? "Atrás" : "Volver"}
        </button>

        <div className="register-header">
          <span>🏐</span>
          <h1>Únete al Club</h1>
          <p>Crea tu cuenta deportiva</p>
        </div>

        {/* ── Step indicators ── */}
        <div className="register-steps">
          {stepLabels.map((s, idx) => (
            <div key={s.num} style={{ display: "contents" }}>
              <div className={`register-step ${step >= s.num ? "active" : ""}`}>
                <span>{s.num}</span> {s.label}
              </div>
              {idx < stepLabels.length - 1 && <div className="register-step-line" />}
            </div>
          ))}
        </div>

        <form className="register-form" onSubmit={(e) => e.preventDefault()}>

          {/* ── Step 1: Datos personales ── */}
          {step === 1 && (
            <div className="register-section">
              <h3>👤 Datos Personales</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nombre *</label>
                  <input className="form-input" name="nombre" value={form.nombre}
                    onChange={handleChange} placeholder="Juan" />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellido *</label>
                  <input className="form-input" name="apellido" value={form.apellido}
                    onChange={handleChange} placeholder="Pérez" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Fecha de Nacimiento *</label>
                <input className="form-input" type="date" name="nacimiento"
                  value={form.nacimiento} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Apodo *</label>
                <input className="form-input" name="apodo" value={form.apodo}
                  onChange={handleChange} placeholder="Juancho" />
              </div>
              <div className="form-group">
                <label className="form-label">DNI *</label>
                <input className="form-input" name="dni" value={form.dni} maxLength={8}
                  onChange={(e) => handleChange({
                    target: { name: "dni", value: e.target.value.replace(/\D/g, "") }
                  })}
                  placeholder="47503762" />
              </div>
              <div className="form-group">
                <label className="form-label">Teléfono *</label>
                <div className="input-phone-wrapper">
                  <span className="input-phone-prefix">🇵🇪 +51</span>
                  <input
                    className="form-input form-input--phone"
                    name="telefono"
                    value={form.telefono}
                    maxLength={9}
                    onChange={(e) => handleChange({
                      target: { name: "telefono", value: e.target.value.replace(/\D/g, "") }
                    })}
                    placeholder="987654321"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Género *</label>
                <select className="form-select" name="genero" value={form.genero} onChange={handleChange}>
                  <option value="">Seleccionar...</option>
                  {GENEROS.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              {error && <div className="form-error">⚠️ {error}</div>}
              <button className="btn btn--primary btn--full" type="button" onClick={handleNext}>
                Continuar →
              </button>
            </div>
          )}

          {/* ── Step 2: Datos deportivos ── */}
          {step === 2 && (
            <div className="register-section">
              <h3>🏐 Datos Deportivos</h3>
              <div className="form-group">
                <label className="form-label">Nivel *</label>
                <select className="form-select" name="nivel" value={form.nivel} onChange={handleChange}>
                  <option value="">Seleccionar nivel...</option>
                  {NIVELES.map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Posición *</label>
                <select className="form-select" name="posicion" value={form.posicion} onChange={handleChange}>
                  <option value="">Seleccionar posición...</option>
                  {POSICIONES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              {error && <div className="form-error">⚠️ {error}</div>}
              <button className="btn btn--primary btn--full" type="button" onClick={handleGoToVerify}>
                Verificar teléfono →
              </button>
            </div>
          )}

          {/* ── Step 3: Phone verification ── */}
          {step === 3 && (
            <div className="register-section">
              <PhoneVerificationStep
                phone={form.telefono}
                sending={sending}
                verifying={verifying}
                codeSent={codeSent}
                verified={verified}
                phoneError={phoneError}
                onSendCode={handleSendCode}
                onVerifyCode={handleVerifyCode}
                onResend={resetAuth}
              />
              {error && <div className="form-error">⚠️ {error}</div>}
              {loading && (
                <div className="phone-sending" style={{ justifyContent: "center", marginTop: 12 }}>
                  <span className="btn-spinner btn-spinner--dark" />
                  <span>Creando tu cuenta...</span>
                </div>
              )}
            </div>
          )}

        </form>

        <p className="register-footer">
          ¿Ya tienes cuenta?{" "}
          <button className="btn btn--link" onClick={() => navigate("/login")}>Ingresar</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
