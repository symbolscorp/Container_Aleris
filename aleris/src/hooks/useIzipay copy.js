// src/hooks/useIzipay.js
import { useEffect, useState } from "react";
import { izipayCobrar } from "../api/izipayApi";

export const useIzipay = (evento) => {
  const [sdkListo, setSdkListo] = useState(false);

  useEffect(() => {
    if (window.Izipay) {
      setSdkListo(true);
      return;
    }
    const interval = setInterval(() => {
      if (window.Izipay) {
        setSdkListo(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const abrirCheckout = async (onExito) => {
    if (!window.Izipay) {
      console.error("SDK no listo");
      return;
    }
    try {
      const data = await izipayCobrar({   // ✅ data, no resp
        monto: evento.costo,
        orderNumber: "ORDER-" + Date.now(),
        email: "cliente@email.com",
        nombres: "Wilmer Alberto",
        apellidos: "Pacheco Llacho",
      });

      console.log("Respuesta izipayCobrar:", data);
      const { formToken, publicKey } = data;

      const checkout = new window.Izipay({
        authorization: formToken,
        merchantCode: 19769948,
        order: {
          currency: "PEN",
          amount: String(evento.costo),
        },
      });

      checkout.render({
        targetElement: "",
        publicKey: publicKey,
        appearance: { theme: "default" },
        onSuccess: (response) => onExito(response),
        onError: (error) => console.error("Error Izipay:", error),
        onClose: () => console.log("Formulario cerrado"),
      });

    } catch (err) {
      console.error("Error:", err);
    }
  };

  return { sdkListo, abrirCheckout };
};