package com.symbols.servidoraleris.service;

import com.symbols.servidoraleris.IzipayConfig;
import com.symbols.servidoraleris.common.CrearPagoResponse;
import com.symbols.servidoraleris.controller.CuentaController;
import com.symbols.servidoraleris.modeldto.CrearPagoRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;

@Service
public class IzipayService {

    private final IzipayConfig config;
    private final RestTemplate restTemplate;
    private static final Logger log = LoggerFactory.getLogger(CuentaController.class);

    public IzipayService(IzipayConfig config) {
        this.config = config;
        this.restTemplate = new RestTemplate();
    }

    public CrearPagoResponse crearPago(CrearPagoRequest request) {

        log.info("🔐 Generando credenciales para merchant: {}", config.getMerchantCode());
        String credentials = Base64.getEncoder().encodeToString(
                (config.getMerchantCode() + ":" + config.getApiPassword()).getBytes()
        );
        log.info("🔐 Generando credenciales para merchant: {}", config.getMerchantCode());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic " + credentials);
        log.info("🔐 Generando credenciales para merchant: {}", config.getMerchantCode());
        log.info("🔐 Generando credenciales para merchant: {}", request.getNombres());
        log.info("🔐 Generando credenciales para merchant: {}", request.getApellidos());
        Map<String, Object> body = Map.of(
                "amount", Math.round(request.getMonto() * 100),
                "currency", "PEN",
                "orderId", request.getOrderNumber(),
                "customer", Map.of(
                        "email", request.getEmail(),
                        "billingDetails", Map.of(
                                "firstName", request.getNombres(),
                                "lastName", request.getApellidos()
                        )
                )
        );

        log.info("📤 Enviando a Izipay: url={}, body={}", config.getBaseUrl(), body);

        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                config.getBaseUrl() + "/api-payment/V4/Charge/CreatePayment",
                HttpMethod.POST,
                httpEntity,
                Map.class
        );

        Map<String, Object> responseBody = response.getBody();
        log.info("📨 Respuesta de Izipay: {}", responseBody);

        if (responseBody == null || !"SUCCESS".equals(responseBody.get("status"))) {
            log.error("❌ Izipay respondió con error: {}", responseBody);
            throw new RuntimeException("Error al crear pago en Izipay: " + responseBody);
        }

        Map<String, Object> answer = (Map<String, Object>) responseBody.get("answer");

        String formToken = (String) answer.get("formToken");
        String publicKey = config.getPublicKey();


        log.info("🔑 formToken: {}", formToken);
        log.info("🔑 publicKey: {}", publicKey);

        log.info("✅ FormToken generado correctamente");
        return new CrearPagoResponse(formToken, publicKey);
    }
}