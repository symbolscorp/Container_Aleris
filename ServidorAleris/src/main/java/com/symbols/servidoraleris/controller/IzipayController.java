package com.symbols.servidoraleris.controller;

import com.symbols.servidoraleris.common.CrearPagoResponse;
import com.symbols.servidoraleris.modeldto.CrearPagoRequest;
import com.symbols.servidoraleris.service.IzipayService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/pagos")
public class IzipayController {

    @Autowired
    private final IzipayService izipayService;

    private static final Logger log = LoggerFactory.getLogger(CuentaController.class);

    @PostMapping("/crear")
    public ResponseEntity<CrearPagoResponse> crearPago(@RequestBody CrearPagoRequest request) {
        try {
            log.info("📥 Solicitud de pago recibida: monto={}, order={}, email={}",
                    request.getMonto(), request.getOrderNumber(), request.getEmail());

            CrearPagoResponse response = izipayService.crearPago(request);

            log.info("✅ Pago creado exitosamente: formToken={}", response.getFormToken());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("❌ Error al crear pago: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
}