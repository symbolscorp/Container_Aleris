package com.symbols.servidoraleris.controller;

import com.symbols.servidoraleris.common.IResponse;
import com.symbols.servidoraleris.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/resumen")
    public ResponseEntity<IResponse> resumen() {
        IResponse responseController = new IResponse();

        responseController.setData(dashboardService.obtenerResumen());
        responseController.setType("Object");
        responseController.setMessage("Transaccion Exitosa");
        responseController.setStatus("Success");
        return ResponseEntity.ok(responseController);
    }
}
