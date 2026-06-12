package com.symbols.servidoraleris.controller;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.common.IResponse;
import com.symbols.servidoraleris.model.Club;
import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Usuario;
import com.symbols.servidoraleris.modeldto.CuentaDTO;
import com.symbols.servidoraleris.modeldto.UsuarioDTO;
import com.symbols.servidoraleris.service.CuentaService;
import com.symbols.servidoraleris.util.ApiResponse;
import com.symbols.servidoraleris.util.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cuenta")
@RequiredArgsConstructor
public class CuentaController {

    private final CuentaService service;
    private final ModelMapper modelMapper;

    private static final Logger log = LoggerFactory.getLogger(CuentaController.class);

    @PostMapping("/insert")
    public ResponseEntity<IResponse> insert(@RequestBody CuentaDTO dto) {
        IResponse responseController = new IResponse();
        Cuenta entity = modelMapper.map(dto, Cuenta.class);
        entity.setId(null);
        GlobalResponse responseService = service.insert(entity);
        if (responseService.isStatus()){
            CuentaDTO result = modelMapper.map(responseService.getData(), CuentaDTO.class);
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

    @PutMapping("/update")
    public ResponseEntity<IResponse> update(@RequestBody CuentaDTO dto) {
        IResponse responseController = new IResponse();
        Cuenta entity = modelMapper.map(dto, Cuenta.class);
        entity.setId(null);
        GlobalResponse responseService = service.update(entity);
        if (responseService.isStatus()){
            CuentaDTO result = modelMapper.map(responseService.getData(), CuentaDTO.class);
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
            CuentaDTO result = modelMapper.map(responseService.getData(), CuentaDTO.class);
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

    @GetMapping("/cuentasIdUsuario/{id}")
    public ResponseEntity<IResponse> cuentasIdUsuario(@PathVariable Integer id) {

        IResponse responseController = new IResponse();

        GlobalResponse responseService = service.cuentasIdUsuario(id);
        if (responseService.isStatus()){
            CuentaDTO result = modelMapper.map(responseService.getData(), CuentaDTO.class);
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

    @GetMapping("/usuario/{dni}")
    public ResponseEntity<IResponse> usuarioDni(@PathVariable Integer dni) {

        IResponse responseController = new IResponse();

        GlobalResponse responseService = service.usuarioDni(dni);
        if (responseService.isStatus()){
            CuentaDTO result = modelMapper.map(responseService.getData(), CuentaDTO.class);
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

    @GetMapping("/selectAll")
    public ResponseEntity<IResponse> selectAll() {

        IResponse responseController = new IResponse();

        GlobalResponse<List<Cuenta>>  responseService = service.selectAll();
        if (responseService.isStatus()){
            List<UsuarioDTO> result = responseService.getData().stream()
                    .map(u -> modelMapper.map(u, UsuarioDTO.class))
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
