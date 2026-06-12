package com.symbols.servidoraleris.controller;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.common.IResponse;
import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Usuario;
import com.symbols.servidoraleris.modeldto.PagoRequest;
import com.symbols.servidoraleris.modeldto.UsuarioDTO;
import com.symbols.servidoraleris.service.CuentaService;
import com.symbols.servidoraleris.service.CulqiService;
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

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuario")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService service;
    private final CuentaService serviceCuenta;
    private final ModelMapper modelMapper;

    private static final Logger log = LoggerFactory.getLogger(UsuarioController.class);


    @Autowired
    private CulqiService culqiService;


    @PostMapping("/insert")
    public ResponseEntity<IResponse> insert(@RequestBody UsuarioDTO dto) {
        IResponse responseController = new IResponse();
        Usuario entity = modelMapper.map(dto, Usuario.class);
        entity.setId(null);

        GlobalResponse responseService = service.insert(entity);

        if (responseService.isStatus()){
            UsuarioDTO result = modelMapper.map(responseService.getData(), UsuarioDTO.class);

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
    public ResponseEntity<IResponse> update(@RequestBody UsuarioDTO dto) {
        IResponse responseController = new IResponse();
        Usuario entity = modelMapper.map(dto, Usuario.class);

        GlobalResponse responseService = service.insert(entity);
        if (responseService.isStatus()){
            UsuarioDTO result = modelMapper.map(responseService.getData(), UsuarioDTO.class);
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
            UsuarioDTO result = modelMapper.map(responseService.getData(), UsuarioDTO.class);
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

        GlobalResponse<List<Usuario>>  responseService = service.selectAll();
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


    @GetMapping("/selectDni/{dni}")
    public ResponseEntity<IResponse> selectDni(@PathVariable String dni) {
        IResponse responseController = new IResponse();

        GlobalResponse responseService = service.findByDni(dni);
        if (responseService.isStatus()){
            UsuarioDTO result = modelMapper.map(responseService.getData(), UsuarioDTO.class);
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
    

    @PostMapping("/cobrar")
    public ResponseEntity<?> cobrar(@RequestBody PagoRequest request) {
        ResponseEntity<String> respuesta = culqiService.crearCargo(request);
        return ResponseEntity.ok(respuesta.getBody());
    }
}
