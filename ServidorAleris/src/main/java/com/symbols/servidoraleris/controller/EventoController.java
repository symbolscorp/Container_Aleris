package com.symbols.servidoraleris.controller;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.common.IResponse;
import com.symbols.servidoraleris.model.Cancha;
import com.symbols.servidoraleris.model.Club;
import com.symbols.servidoraleris.model.Evento;
import com.symbols.servidoraleris.modeldto.ClubDTO;
import com.symbols.servidoraleris.modeldto.CuentaDTO;
import com.symbols.servidoraleris.modeldto.EventoDTO;
import com.symbols.servidoraleris.service.EventoService;
import com.symbols.servidoraleris.util.ApiResponse;
import com.symbols.servidoraleris.util.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controlador REST para la entidad {@link Evento}.
 * Expone los endpoints CRUD bajo la ruta {@code /api/evento}.
 */
@RestController
@RequestMapping("/api/evento")
@RequiredArgsConstructor
public class EventoController {

    private final EventoService service;
    private final ModelMapper modelMapper;
    @GetMapping("/selectAll")
    public ResponseEntity<IResponse> selectAll() {

        IResponse responseController = new IResponse();

        GlobalResponse<List<Evento>> responseService = service.selectAll();
        if (responseService.isStatus()){
            List<EventoDTO> result = responseService.getData().stream()
                    .map(u -> modelMapper.map(u, EventoDTO.class))
                    .collect(Collectors.toList());
            responseController.setData(result);
            responseController.setType("Object");
            responseController.setMessage("Transaccion Exitosa");
            responseController.setStatus("Success");
        }
        else {
            responseController.setMessage(responseService.getMessage());
            responseController.setStatus("Error");
        }
        return ResponseEntity.ok(responseController);
    }

    @GetMapping("/selectAllActivos")
    public ResponseEntity<IResponse> selectAllActivos() {

        IResponse responseController = new IResponse();

        GlobalResponse<List<Evento>> responseService = service.selectAllActivos();
        if (responseService.isStatus()){
            List<EventoDTO> result = responseService.getData().stream()
                    .map(u -> modelMapper.map(u, EventoDTO.class))
                    .collect(Collectors.toList());
            responseController.setData(result);
            responseController.setType("Object");
            responseController.setMessage("Transaccion Exitosa");
            responseController.setStatus("Success");
        }
        else {
            responseController.setMessage(responseService.getMessage());
            responseController.setStatus("Error");
        }
        return ResponseEntity.ok(responseController);
    }

    @GetMapping("/selectId/{id}")
    public ResponseEntity<IResponse> selectId(@PathVariable Integer id) {

        IResponse responseController = new IResponse();

        GlobalResponse responseService = service.selectId(id);
        if (responseService.isStatus()){
            EventoDTO result = modelMapper.map(responseService.getData(), EventoDTO.class);
            responseController.setData(result);
            responseController.setType("Object");
            responseController.setMessage("Transaccion Exitosa");
            responseController.setStatus("Success");
        }
        else {
            responseController.setMessage(responseService.getMessage());
            responseController.setStatus("Error");
        }

        return ResponseEntity.ok(responseController);
    }
}
