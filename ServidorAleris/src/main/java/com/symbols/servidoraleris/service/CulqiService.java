package com.symbols.servidoraleris.service;

import com.symbols.servidoraleris.model.Inscripcion;
import com.symbols.servidoraleris.modeldto.CulqiDTO;
import com.symbols.servidoraleris.modeldto.EventoDTO;
import com.symbols.servidoraleris.modeldto.InscripcionDTO;
import com.symbols.servidoraleris.modeldto.PagoRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class CulqiService {

   // @Value("${culqi.secret-key}")
    private String secretKey="sk_test_DocOXeeJrW0N39rO";

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.culqi.com/v2")
            .build();

    // ── Crear Orden (para Yape, billeteras) ──────────────────────
    public Map crearOrden(CulqiDTO culqi) {
        Map<String, Object> body = new HashMap<>();
        body.put("amount", culqi.getMonto());
        body.put("currency_code", "PEN");
        body.put("description", culqi.getDescripcion());
        body.put("order_number", "EVT-" +System.currentTimeMillis());
        body.put("expiration_date", (System.currentTimeMillis() / 1000) + 3600);
        body.put("confirm", false);

        Map<String, String> clientDetails = new HashMap<>();
        clientDetails.put("first_name", culqi.getNombre());
        clientDetails.put("last_name", culqi.getApellido());
        clientDetails.put("email", culqi.getCorreo());
        clientDetails.put("phone_number", culqi.getTelefono());
        body.put("client_details", clientDetails);

        return webClient.post()
                .uri("/orders")
                .header("Authorization", "Bearer " + secretKey)
                .header("Content-Type", "application/json")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }

    // ── Crear Cargo (para tarjeta) ────────────────────────────────
    public Map crearCargo(String token, int amount, String email) {
        Map<String, Object> body = new HashMap<>();
        body.put("amount", amount);
        body.put("currency_code", "PEN");
        body.put("email", email);
        body.put("source_id", token);
        body.put("description", "Inscripción a evento");

        return webClient.post()
                .uri("/charges")
                .header("Authorization", "Bearer " + secretKey)
                .header("Content-Type", "application/json")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }

    public ResponseEntity<String> crearCargo(PagoRequest pago) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(secretKey);
        Integer amount = pago.getMonto()
                .multiply(new BigDecimal("100"))
                .intValue();

        Map<String, Object> body = new HashMap<>();
        body.put("amount", amount); // soles -> céntimos
        body.put("currency_code", "PEN");
        body.put("email", pago.getEmail());
        body.put("source_id", pago.getToken());
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        return restTemplate.postForEntity("https://api.culqi.com/v2/charges", request, String.class);
    }
}
