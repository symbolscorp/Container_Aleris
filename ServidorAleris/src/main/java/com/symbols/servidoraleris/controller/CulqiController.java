package com.symbols.servidoraleris.controller;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.common.IResponse;
import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Pago;
import com.symbols.servidoraleris.model.Usuario;
import com.symbols.servidoraleris.modeldto.CuentaDTO;
import com.symbols.servidoraleris.modeldto.PagoRequest;
import com.symbols.servidoraleris.modeldto.UsuarioDTO;
import com.symbols.servidoraleris.service.CuentaService;
import com.symbols.servidoraleris.service.CulqiService;
import com.symbols.servidoraleris.service.PagoService;
import com.symbols.servidoraleris.service.UsuarioService;
import com.symbols.servidoraleris.util.ApiResponse;
import com.symbols.servidoraleris.util.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/culqi")
@RequiredArgsConstructor
public class CulqiController {
    @Autowired
    private CulqiService culqiService;
    @Autowired
    private PagoService pagoService;
    private final ModelMapper modelMapper;

/*
    @PostMapping("/crear-orden")
    public ResponseEntity<IResponse> crearOrden(CulqiDTO culqi) {
        IResponse responseController = new IResponse();
        try {
            Map orden = culqiService.crearOrden(culqi);
            responseController.setData(orden);
            responseController.setType("Object");
            responseController.setMessage("Transaccion Exitosa");
            responseController.setStatus("Success");
            return ResponseEntity.ok(responseController);
        } catch (Exception e) {
            responseController.setMessage("Error con la generacion del cargo");
            responseController.setStatus("Error");
        }
        return ResponseEntity.ok(responseController);
    }
    @PostMapping("/cobrar")
    public ResponseEntity<?> cobrar(@RequestBody Map<String, Object> body) {
        try {
            String token = (String) body.get("token");
            int amount = (int) body.get("amount");
            String email = (String) body.get("email");

            Map cargo = culqiService.crearCargo(token, amount, email);
            return ResponseEntity.ok(Map.of("success", true, "charge", cargo));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "error", e.getMessage()));
        }
    }
    */

    @PostMapping("/cobrar")
    public ResponseEntity<?> cobrar(@RequestBody PagoRequest request) throws Exception {

        ObjectMapper mapper = new ObjectMapper();

        // 1. Registrar pago pendiente ANTES de cobrar
        Pago pago = new Pago();
        pago.setToken(request.getToken());
        pago.setMonto(request.getMonto());
        pago.setEmail(request.getEmail());
        pago.setEstado("PENDIENTE");
        pago.setFecha(LocalDateTime.now());
        GlobalResponse responseService = pagoService.insert(pago); // 👈 insert
        pago = modelMapper.map(responseService.getData(), Pago.class);
        try {

            ResponseEntity<String> respuesta = culqiService.crearCargo(request);
            JsonNode json = mapper.readTree(respuesta.getBody());

            if ("error".equals(json.path("object").asText())) {

                pago.setEstado("FALLIDO");
                pago.setRespuesta(json.toString());
                pagoService.update(pago);

                return ResponseEntity.ok(json);
            }

            pago.setCulqi(json.path("id").asText()); // chr_test_xxx
            pago.setEstado("EXITOSO");
            pago.setRespuesta(json.toString());
            pagoService.update(pago);

            return ResponseEntity.ok(json);

        } catch (Exception e) {
            // Error inesperado (timeout, red, etc.)
            pago.setEstado("FALLIDO");
            pagoService.update(pago); // 👈 update
            throw e;
        }
    }

    /*
    @PostMapping("/cobrar")
    public ResponseEntity<?> cobrar(@RequestBody PagoRequest request) {

        ResponseEntity<String> respuesta = culqiService.crearCargo(request);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode json = mapper.readTree(respuesta.getBody());

        Pago pago = new Pago();
        pago.setCulqiId("");
        pago.setToken(request.getToken());
        pago.setMonto(request.getMonto());
        pago.setEmail(request.getEmail());
        pago.setEstado("Pendiente");
        pago.setInscripcionId(0);
        pago.setFecha(ahora);
        pago.setRespuesta(json en string);
        pagoRepository.insert(pago);

        return ResponseEntity.ok(json);
    }
    */

}
