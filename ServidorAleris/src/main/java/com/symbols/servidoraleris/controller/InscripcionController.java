package com.symbols.servidoraleris.controller;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.common.IResponse;
import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Evento;
import com.symbols.servidoraleris.model.Inscripcion;
import com.symbols.servidoraleris.model.Usuario;
import com.symbols.servidoraleris.modeldto.InscripcionDTO;
import com.symbols.servidoraleris.modeldto.UsuarioDTO;
import com.symbols.servidoraleris.service.InscripcionService;
import com.symbols.servidoraleris.service.WhatsAppService;
import com.symbols.servidoraleris.util.ApiResponse;
import com.symbols.servidoraleris.util.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controlador REST para la entidad {@link Inscripcion}.
 * Expone los endpoints CRUD bajo la ruta {@code /api/inscripcion}.
 */
@RestController
@RequestMapping("/api/inscripcion")
@RequiredArgsConstructor
public class InscripcionController {

    private final InscripcionService service;
    private final ModelMapper modelMapper;

    @Autowired
    private WhatsAppService serviceWhatsaap;
    @PostMapping("/insert")
    public ResponseEntity<IResponse> insert(@RequestBody InscripcionDTO dto) {
        IResponse responseController = new IResponse();
        Inscripcion entity = modelMapper.map(dto, Inscripcion.class);
        entity.setId(null);
        GlobalResponse responseService = service.insert(entity);
        if (responseService.isStatus()){

            InscripcionDTO result = modelMapper.map(responseService.getData(), InscripcionDTO.class);

            //Envio al usuario por su inscripcion al evento.
            serviceWhatsaap.sendMessage(
                    "51" + result.getCuenta().getUsuario().getTelefono(),
                    "🏐 *Inscripción confirmada*\n\n" +
                            "🙏 Gracias por inscribirse al evento:\n" +
                            "📌 *" + result.getEvento().getDescripcion() + "*\n\n" +
                            "🕒 *Horario:* " + result.getEvento().getHorainicio() + " - " + result.getEvento().getHorafin() + "\n" +
                            "📅 *Fecha:* " + result.getEvento().getFecha() + "\n\n" +
                            "⚠️ No olvides llegar *10 minutos antes* de las " + result.getEvento().getHorainicio() + "\n\n" +
                            "📍 *Cancha:* " + result.getEvento().getCancha().getDescripcion() + "\n" +
                            "🎽 *Tu posición:* " + result.getNumero() + "\n\n" +
                            "💪 ¡Nos vemos en la cancha!"
            );
            
            String mensajeGlobalGrupo =
                "🏐 *" + result.getEvento().getClub().getDescripcion() + "*\n" +
                "📌 " + result.getEvento().getDescripcion() + "\n" +
                "📍 Cancha: " + result.getEvento().getCancha().getDescripcion() + "\n\n" +

                "🕒 *Horario*\n" +
                "➡️ " + result.getEvento().getHorainicio() + " a " + result.getEvento().getHorafin() + "\n\n" +

                "💰 *Costo:* S/ " + result.getEvento().getCosto() + "\n\n" +

                "🔗 *Inscripción:* https://gruposymbols.life/\n\n" +

                "👥 *Asistentes confirmados:*\n";


            // inscritos
            GlobalResponse<List<Inscripcion>> responseServiceInscripciones =
                    service.selectAllxEventos(result.getEvento().getId());

            if (responseServiceInscripciones.isStatus()) {

                List<InscripcionDTO> resultDTO = responseServiceInscripciones.getData()
                        .stream()
                        .map(u -> modelMapper.map(u, InscripcionDTO.class))
                        .collect(Collectors.toList());

                int contador = 1;

                for (InscripcionDTO i : resultDTO) {
                    mensajeGlobalGrupo +=
                            "   " + contador + ". " +
                            i.getCuenta().getUsuario().getNombre() + " " +
                            i.getCuenta().getUsuario().getApellido() + "\n";
                    contador++;
                }
            }


            // cierre bonito
            mensajeGlobalGrupo += "\n🔥 ¡Nos vemos en la cancha!\n" +
                                "📣 @all";

            serviceWhatsaap.sendMessage(
                    "120363410384612915@g.us",mensajeGlobalGrupo);

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
            InscripcionDTO result = modelMapper.map(responseService.getData(), InscripcionDTO.class);
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

        GlobalResponse<List<Inscripcion>> responseService = service.selectAll();
        if (responseService.isStatus()) {
            List<InscripcionDTO> result = responseService.getData().stream()
                    .map(u -> modelMapper.map(u, InscripcionDTO.class))
                    .collect(Collectors.toList());
            responseController.setData(result);
            responseController.setType("Object");
            responseController.setMessage("Transaccion Exitosa");
            responseController.setStatus("Success");
        } else {
            responseController.setMessage(responseService.getMessage());
            responseController.setStatus("Error");
        }
        return ResponseEntity.ok(responseController);
    }

    @GetMapping("/selectAllxUsuario/{id}")
    public ResponseEntity<IResponse> selectAllxUsuario(@PathVariable Integer id) {
        IResponse responseController = new IResponse();

        GlobalResponse<List<Inscripcion>> responseService = service.inscripcionesIdUsuario(id);
        if (responseService.isStatus()) {

            for (Inscripcion x : responseService.getData()) {
                try {
                    modelMapper.map(x, InscripcionDTO.class);
                } catch (Exception e) {
                    System.out.println("Inscripcion ID: " + x.getId());
                    e.printStackTrace();
                    break;
                }
            }
            List<InscripcionDTO> result = responseService.getData().stream()
                    .map(u -> modelMapper.map(u, InscripcionDTO.class))
                    .collect(Collectors.toList());
            responseController.setData(result);
            responseController.setType("Object");
            responseController.setMessage("Transaccion Exitosa");
            responseController.setStatus("Success");
        } else {
            responseController.setMessage(responseService.getMessage());
            responseController.setStatus("Error");
        }
        return ResponseEntity.ok(responseController);
    }

    @GetMapping("/selectAllxEventos/{idEvento}")
    public ResponseEntity<IResponse> selectAllxEventos(@PathVariable Integer idEvento) {
        IResponse responseController = new IResponse();

        GlobalResponse<List<Inscripcion>> responseService = service.selectAllxEventos(idEvento);
        if (responseService.isStatus()) {

            for (Inscripcion x : responseService.getData()) {
                try {
                    modelMapper.map(x, InscripcionDTO.class);
                } catch (Exception e) {
                    System.out.println("Inscripcion ID: " + x.getId());
                    e.printStackTrace();
                    break;
                }
            }
            List<InscripcionDTO> result = responseService.getData().stream()
                    .map(u -> modelMapper.map(u, InscripcionDTO.class))
                    .collect(Collectors.toList());
            responseController.setData(result);
            responseController.setType("Object");
            responseController.setMessage("Transaccion Exitosa");
            responseController.setStatus("Success");
        } else {
            responseController.setMessage(responseService.getMessage());
            responseController.setStatus("Error");
        }
        return ResponseEntity.ok(responseController);
    }


}
