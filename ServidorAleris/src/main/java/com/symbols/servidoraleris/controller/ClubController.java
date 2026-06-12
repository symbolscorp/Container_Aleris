package com.symbols.servidoraleris.controller;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.common.IResponse;
import com.symbols.servidoraleris.model.Cancha;
import com.symbols.servidoraleris.model.Club;
import com.symbols.servidoraleris.modeldto.CanchaDTO;
import com.symbols.servidoraleris.modeldto.ClubDTO;
import com.symbols.servidoraleris.service.ClubService;
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
 * Controlador REST para la entidad {@link Club}.
 * Expone los endpoints CRUD bajo la ruta {@code /api/club}.
 */
@RestController
@RequestMapping("/api/club")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService service;
    private final ModelMapper modelMapper;

    @GetMapping("/selectAll")
    public ResponseEntity<IResponse> selectAll() {

        IResponse responseController = new IResponse();

        GlobalResponse<List<Club>> responseService = service.selectAll();
        if (responseService.isStatus()){
            List<ClubDTO> result = responseService.getData().stream()
                    .map(u -> modelMapper.map(u, ClubDTO.class))
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
