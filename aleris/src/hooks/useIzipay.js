// src/hooks/useIzipay.js
import { izipayCobrar } from "../api/izipayApi";

export const useIzipay = (evento) => {

  const abrirCheckout = async (onExito) => {
    try {
      const data = await izipayCobrar({
        monto: evento.costo,
        orderNumber: "ORDER-" + Date.now(),
        email: "cliente@email.com",
        nombres: "Wilmer Alberto",
        apellidos: "Pacheco Llacho",
      });

      console.log("FormToken:", data.formToken);
      console.log("PublicKey:", data.publicKey);

      const now = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const dateTimeTransaction =
        now.getFullYear().toString() +
        pad(now.getMonth() + 1) +
        pad(now.getDate()) +
        pad(now.getHours()) +
        pad(now.getMinutes()) +
        pad(now.getSeconds());

      const checkout = new window.iziCheckout({
        config: {
          transactionId: "TXN-" + Date.now(),
          action: "pay",
          merchantCode: "19769948",
          order: {
            orderNumber: "ORD-" + Date.now(),
            currency: "PEN",
            amount: String(evento.costo),
            processType: "AT",
            merchantBuyerId: "19769948",
            dateTimeTransaction: dateTimeTransaction,
          },
          billing: {
            firstName: "Wilmer",
            lastName: "Pacheco",
            email: "cliente@email.com",
            phoneNumber: "999999999",
            street: "Av. Principal 123",
            city: "Arequipa",
            state: "Arequipa",
            country: "PE",
            postalCode: "04001",
            documentType: "DNI",
            document: "12345678",
          },
          render: {
            typeForm: "pop-up",
            container: "body",
            redirectUrls: {
              onSuccess: "https://sandbox-checkout.izipay.pe/success",
              onError: "https://sandbox-checkout.izipay.pe/error",
              onCancel: "https://sandbox-checkout.izipay.pe/cancel",
            },
          },
          urlRedirect: "https://sandbox-checkout.izipay.pe/redirect",
          urlIPN: "",
        },
      });

      checkout.LoadForm({
        authorization: data.formToken,
        keyRSA: data.publicKey,
        container: "#checkout-container",
        enabledPaymentMethods: ["CARD"],
        render: {
          typeForm: "pop-up",
          container: "body",
          redirectUrls: {
            onSuccess: "https://sandbox-checkout.izipay.pe/success",
            onError: "https://sandbox-checkout.izipay.pe/error", 
            onCancel: "https://sandbox-checkout.izipay.pe/cancel",
          },
        },
        onResponse: (response, error) => {
          if (error) {
            console.error("Error Izipay:", error);
            return;
          }
          console.log("Pago exitoso:", response);
          onExito(response);
        },
      });

    } catch (err) {
      console.error("Error:", err);
    }
  };

  return { abrirCheckout };
};