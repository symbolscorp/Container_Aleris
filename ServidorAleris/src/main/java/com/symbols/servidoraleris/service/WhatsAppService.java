package com.symbols.servidoraleris.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class WhatsAppService {

    private final RestTemplate restTemplate = new RestTemplate();

    private final String URL = "http://evolution_api:8080/message/sendText/Aleris";
    private final String API_KEY = "1511199220020214WILMER";

    public String sendMessage(String number, String text) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("apikey", API_KEY);

        Map<String, String> body = new HashMap<>();
        body.put("number", number);
        body.put("text", text);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                URL,
                request,
                String.class
        );

        return response.getBody();
    }

}
