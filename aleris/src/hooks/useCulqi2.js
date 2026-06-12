// src/hooks/useCulqi.js
import { useEffect, useState } from "react";

const CULQI_PUBLIC_KEY = "pk_test_Jnkv4ZwqwrYv21p3";

export const useCulqi = (evento) => {  // 👈 asegúrate que diga "export const"
  const [culqiListo, setCulqiListo] = useState(false);

  useEffect(() => {
    if (window.Culqi) {
      configurarCulqi(evento);
      setCulqiListo(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.culqi.com/js/v4";
    script.async = true;
    script.onload = () => {
      configurarCulqi(evento);
      setCulqiListo(true);
    };
    document.body.appendChild(script);
  }, [evento]);

  const configurarCulqi = (evento) => {
    if (!evento) return;
    window.Culqi.publicKey = CULQI_PUBLIC_KEY;
    window.Culqi.settings({
      title: evento.descripcion || "Inscripción",
      currency: "PEN",
      amount: evento.costo * 100,
      firstName: "usuario?.nombre",   // 👈 agrega esto
      lastName: "usuario?.apellido",  // 👈 agrega esto
      paymentMethods: {
      tarjeta: true,
      yape: true,
      billetera: true,
      bancaMovil: true,
      agente: true,
      cuotealo: true,
      },
    });
  };

  const abrirCheckout = (onToken) => {
    if (!culqiListo || !window.Culqi) return;

    window.culqi = () => {
      if (window.Culqi.token) {
        const token = window.Culqi.token.id;
        window.Culqi.close();
        onToken(token);
      }
    };

    window.Culqi.open();
  };

  return { culqiListo, abrirCheckout };
};