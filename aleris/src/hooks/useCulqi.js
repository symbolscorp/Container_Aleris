// src/hooks/useCulqi.js
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

const CULQI_PUBLIC_KEY = "pk_test_Jnkv4ZwqwrYv21p3";

export const useCulqi = (evento) => {
  const [culqiListo, setCulqiListo] = useState(false);
  const culqiInstance = useRef(null); // 👈 guarda la instancia de CulqiCheckout
  const { usuario } = useAuth();

  useEffect(() => {
    if (!evento) return;

    const inicializar = () => {
      const settings = {
        title: evento.descripcion || "Inscripción",
        currency: "PEN",
        amount: evento.costo * 100,
      };

      const client = {
        email: usuario?.email || "",
      };

      const paymentMethods = {
        tarjeta: true,
        yape: true,
        billetera: true,
        bancaMovil: true,
        agente: true,
        cuotealo: true,
      };

      const options = {
        lang: "es",
        installments: false,
        modal: true,
        paymentMethods,
        paymentMethodsSort: Object.keys(paymentMethods),
      };

      const appearance = {
        theme: "default",
        menuType: "sliderTop",
        hiddenCulqiLogo: false,
        hiddenBanner: false,
        buttonCardPayText: `Pagar`,
        defaultStyle: {
          bannerColor: "#252626",
          buttonBackground: "#252626",
          buttonTextColor: "#ffffff",
          menuColor: "#252626",
          linksColor: "#252626",
          priceColor: "#111827",
        },
      };

      const config = { settings, client, options, appearance };

      // 👇 nueva forma de instanciar
      culqiInstance.current = new window.CulqiCheckout(CULQI_PUBLIC_KEY, config);
      setCulqiListo(true);
    };

    // Si el script ya está cargado
    if (window.CulqiCheckout) {
      inicializar();
      return;
    }

    // Si no, cargarlo
    const script = document.createElement("script");
    script.src = "https://js.culqi.com/checkout-js"; // 👈 nuevo script
    script.async = true;
    script.onload = inicializar;
    document.body.appendChild(script);
  }, [evento, usuario]);

  const abrirCheckout = (onToken) => {
    if (!culqiListo || !culqiInstance.current) return;

    // 👇 nuevo callback
    culqiInstance.current.culqi = () => {
      const culqi = culqiInstance.current;

      if (culqi.token) {
        culqi.close();
        onToken(culqi.token.id); // tarjeta
      } else if (culqi.order) {
        culqi.close();
        onToken(null); // yape / billeteras
      } else {
        console.error("Error Culqi:", culqi.error);
      }
    };

    culqiInstance.current.open();
  };

  return { culqiListo, abrirCheckout };
};