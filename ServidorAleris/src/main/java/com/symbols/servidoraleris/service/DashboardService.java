package com.symbols.servidoraleris.service;

import com.symbols.servidoraleris.repository.DashboardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardRepository dashboardRepository;

    public Map<String, Object> obtenerResumen() {

        Object[] fila = dashboardRepository.obtenerResumen().get(0);

        Map<String, Object> response = new HashMap<>();
        response.put("cantidadUsuarios", fila[0]);
        response.put("cantidadEventos", fila[1]);
        response.put("cantidadClubes", fila[2]);
        response.put("cantidadCanchas", fila[3]);
        response.put("cantidadDistritos", fila[4]);

        return response;
    }
}