import { useState, useEffect, useRef } from "react";
import "../styles/PhoneVerification.css";

const PhoneVerificationStep = ({
  phone,
  sending,
  verifying,
  codeSent,
  verified,
  phoneError,
  onSendCode,
  onVerifyCode,
  onResend,
}) => {
  const [digits, setDigits]     = useState(["", "", "", "", "", ""]);
  const inputsRef               = useRef([]);
  const [countdown, setCountdown] = useState(0);
  const sentRef                 = useRef(false); // evitar doble envío en StrictMode

  // Enviar código UNA sola vez, después de que el DOM haya pintado el recaptcha-container
  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;

    // requestAnimationFrame garantiza que el div#recaptcha-container ya está en el DOM
    requestAnimationFrame(() => {
      onSendCode(`+51${phone}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown de reenvío
  useEffect(() => {
    if (!codeSent) return;
    setCountdown(60);
    const id = setInterval(() => {
      setCountdown((c) => { if (c <= 1) { clearInterval(id); return 0; } return c - 1; });
    }, 1000);
    return () => clearInterval(id);
  }, [codeSent]);

  // Focus al primer input cuando llega el código
  useEffect(() => {
    if (codeSent) setTimeout(() => inputsRef.current[0]?.focus(), 150);
  }, [codeSent]);

  const handleDigit = (index, value) => {
    const v = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = v;
    setDigits(next);
    if (v && index < 5) inputsRef.current[index + 1]?.focus();
    if (next.every(Boolean)) onVerifyCode(next.join(""));
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      onVerifyCode(pasted);
    }
  };

  const handleResend = () => {
    setDigits(["", "", "", "", "", ""]);
    sentRef.current = false;
    onResend();
    requestAnimationFrame(() => onSendCode(`+51${phone}`));
  };

  if (verified) {
    return (
      <div className="phone-step phone-step--success">
        <div className="phone-success-icon">✅</div>
        <h3>¡Teléfono verificado!</h3>
        <p>Creando tu cuenta...</p>
      </div>
    );
  }

  return (
    <div className="phone-step">
      {/* reCAPTCHA DEBE estar en el DOM ANTES de que se llame initRecaptcha */}
      <div id="recaptcha-container" />

      <div className="phone-step__icon">📱</div>
      <h3 className="phone-step__title">Verifica tu teléfono</h3>
      <p className="phone-step__desc">
        {sending
          ? "Enviando código SMS..."
          : <>Ingresa el código enviado a <strong>+51 {phone}</strong></>
        }
      </p>

      {sending && (
        <div className="phone-sending">
          <span className="btn-spinner btn-spinner--dark" />
          <span>Enviando SMS...</span>
        </div>
      )}

      {codeSent && !sending && (
        <>
          <div className="otp-inputs" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                className={`otp-input ${d ? "otp-input--filled" : ""}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={verifying}
              />
            ))}
          </div>

          {verifying && (
            <div className="phone-sending">
              <span className="btn-spinner btn-spinner--dark" />
              <span>Verificando...</span>
            </div>
          )}

          <div className="otp-resend">
            {countdown > 0
              ? <span className="otp-countdown">Reenviar en {countdown}s</span>
              : (
                <button className="btn btn--link" type="button" onClick={handleResend}>
                  ¿No llegó el código? Reenviar SMS
                </button>
              )
            }
          </div>
        </>
      )}

      {phoneError && <div className="form-error">⚠️ {phoneError}</div>}
    </div>
  );
};

export default PhoneVerificationStep;
