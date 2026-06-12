package com.symbols.servidoraleris.service;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.model.Cancha;
import com.symbols.servidoraleris.model.Club;
import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Evento;
import com.symbols.servidoraleris.repository.CanchaRepository;
import com.symbols.servidoraleris.repository.EventoRepository;
import com.symbols.servidoraleris.util.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final EventoRepository repository;
    private final CanchaRepository canchaRepository;


    public GlobalResponse<List<Evento>> selectAll() {

        List<Evento> eventos = repository.findAll();
        GlobalResponse<List<Evento>> response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(eventos);
        return response;

    }

    public GlobalResponse<List<Evento>> selectAllActivos() {

        List<Evento> eventos = repository.selectAllActivos();
        GlobalResponse<List<Evento>> response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(eventos);
        return response;

    }

    @Transactional(readOnly = true)
    public GlobalResponse<Evento> selectId(Integer id) {
        Evento cuenta = repository.findById(id).get();
        GlobalResponse response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(cuenta);

        return response;
    }



}
