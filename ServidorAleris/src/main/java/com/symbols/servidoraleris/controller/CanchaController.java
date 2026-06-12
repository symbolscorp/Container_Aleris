package com.symbols.servidoraleris.controller;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.common.IResponse;
import com.symbols.servidoraleris.model.Cancha;
import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.modeldto.CanchaDTO;
import com.symbols.servidoraleris.modeldto.UsuarioDTO;
import com.symbols.servidoraleris.service.CanchaService;
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
 * Controlador REST para la entidad {@link Cancha}.
 * Expone los endpoints CRUD bajo la ruta {@code /api/cancha}.
 */
@RestController
@RequestMapping("/api/cancha")
@RequiredArgsConstructor
public class CanchaController {

    private final CanchaService service;
    private final ModelMapper modelMapper;

    @GetMapping("/selectAll")
    public ResponseEntity<IResponse> selectAll() {

        IResponse responseController = new IResponse();

        GlobalResponse<List<Cancha>> responseService = service.selectAll();
        if (responseService.isStatus()){
            List<CanchaDTO> result = responseService.getData().stream()
                    .map(u -> modelMapper.map(u, CanchaDTO.class))
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
}
