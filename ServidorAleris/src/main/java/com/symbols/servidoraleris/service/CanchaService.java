package com.symbols.servidoraleris.service;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.model.Cancha;
import com.symbols.servidoraleris.model.Club;
import com.symbols.servidoraleris.repository.CanchaRepository;
import com.symbols.servidoraleris.util.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio de negocio para la entidad {@link Cancha}.
 */
@Service
@RequiredArgsConstructor
public class CanchaService {

    private final CanchaRepository repository;

    public GlobalResponse<List<Cancha>> selectAll() {

        List<Cancha> canchas = repository.findAll();

        GlobalResponse<List<Cancha>> response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(canchas);

        return response;
    }

}
