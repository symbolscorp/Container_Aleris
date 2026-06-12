import { useState, useRef, useCallback } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";

const usePhoneAuth = () => {
  const [codeSent, setCodeSent]     = useState(false);
  const [verified, setVerified]     = useState(false);
  const [sending, setSending]       = useState(false);
  const [verifying, setVerifying]   = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const confirmationRef = useRef(null);
  const recaptchaRef    = useRef(null);

  /**
   * Crea el RecaptchaVerifier con la firma correcta de Firebase v9 modular:
   *   new RecaptchaVerifier(auth, element, params)
   *
   * El div#recaptcha-container DEBE existir en el DOM antes de llamar esto.
   * Por eso lo creamos justo antes de signInWithPhoneNumber, no en un useEffect.
   */
  const initRecaptcha = useCallback(() => {
    // Destruir instancia anterior si existe (ej: en reenvío)
    if (recaptchaRef.current) {
      try { recaptchaRef.current.clear(); } catch (_) {}
      recaptchaRef.current = null;
    }

    const container = document.getElementById("recaptcha-container");
    if (!container) {
      throw new Error("No se encontró #recaptcha-container en el DOM.");
    }

    recaptchaRef.current = new RecaptchaVerifier(
      auth,          // 1er arg: auth instance
      container,     // 2do arg: elemento DOM (más fiable que string id)
      {
        size: "invisible",
        callback: () => {},        // reCAPTCHA resuelto
        "expired-callback": () => { // token expirado
          recaptchaRef.current?.clear?.();
          recaptchaRef.current = null;
        },
      }
    );

    return recaptchaRef.current;
  }, []);

  const sendCode = useCallback(async (phoneE164) => {
    setPhoneError("");
    setSending(true);
    try {
      const appVerifier = initRecaptcha();

      // render() fuerza la inicialización del widget antes de la llamada HTTP
      await appVerifier.render();

      const confirmation = await signInWithPhoneNumber(auth, phoneE164, appVerifier);
      confirmationRef.current = confirmation;
      setCodeSent(true);
    } catch (err) {
      console.error("[usePhoneAuth] sendCode error:", err.code, err.message);
      try { recaptchaRef.current?.clear?.(); } catch (_) {}
      recaptchaRef.current = null;
      setPhoneError(mapFirebaseError(err.code));
    } finally {
      setSending(false);
    }
  }, [initRecaptcha]);

  const verifyCode = useCallback(async (code) => {
    if (!confirmationRef.current) return;
    setPhoneError("");
    setVerifying(true);
    try {
      await confirmationRef.current.confirm(code);
      setVerified(true);
    } catch (err) {
      console.error("[usePhoneAuth] verifyCode error:", err.code, err.message);
      setPhoneError(mapFirebaseError(err.code));
    } finally {
      setVerifying(false);
    }
  }, []);

  const resetAuth = useCallback(() => {
    setCodeSent(false);
    setVerified(false);
    setPhoneError("");
    confirmationRef.current = null;
    try { recaptchaRef.current?.clear?.(); } catch (_) {}
    recaptchaRef.current = null;
  }, []);

  return { sendCode, verifyCode, resetAuth, codeSent, verified, sending, verifying, phoneError };
};

const mapFirebaseError = (code) => {
  const map = {
    "auth/invalid-phone-number":      "Número de teléfono inválido.",
    "auth/too-many-requests":         "Demasiados intentos. Espera unos minutos.",
    "auth/invalid-verification-code": "Código incorrecto. Revisa el SMS.",
    "auth/code-expired":              "El código expiró. Solicita uno nuevo.",
    "auth/quota-exceeded":            "Límite de SMS alcanzado. Intenta más tarde.",
    "auth/captcha-check-failed":      "Error de reCAPTCHA. Recarga la página.",
    "auth/missing-phone-number":      "Ingresa un número de teléfono.",
    "auth/network-request-failed":    "Error de red. Verifica tu conexión.",
  };
  return map[code] ?? `Error de verificación (${code ?? "desconocido"}).`;
};

export default usePhoneAuth;