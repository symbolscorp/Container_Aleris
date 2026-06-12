package com.symbols.servidoraleris.service;

import com.symbols.servidoraleris.common.ErrorMessages;
import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Evento;
import com.symbols.servidoraleris.model.Inscripcion;
import com.symbols.servidoraleris.model.Usuario;
import com.symbols.servidoraleris.repository.CuentaRepository;
import com.symbols.servidoraleris.repository.EventoRepository;
import com.symbols.servidoraleris.repository.InscripcionRepository;
import com.symbols.servidoraleris.util.ResourceNotFoundException;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio de negocio para la entidad {@link Inscripcion}.
 */
@Service
@RequiredArgsConstructor
public class InscripcionService {

    private final InscripcionRepository repository;
    @Autowired
    private EntityManager entityManager;

    public GlobalResponse insert(Inscripcion obj) {
        GlobalResponse<Inscripcion> response = new GlobalResponse();
        //Verifico que el usuario no tenga una cuenta con el mismo club
        if (false && repository.existeInscripcion(
                obj.getCuenta().getId(),
                obj.getEvento().getId())) {
            response.setStatus(false);
            response.setMessage(ErrorMessages.USER_EXIST_INSCRIPTIONS);
            return response;
        } else {
            try {
                response.setMessage("Transaccion Existosa");
                repository.saveAndFlush(obj);
                entityManager.clear();
                obj = repository.findById(obj.getId()).get();
                response.setData(obj);
                return response;

            } catch (JpaSystemException e) {

                response.setStatus(false);
                response.setMessage(
                        e.getMostSpecificCause().getMessage()
                );

                return response;

            }
        }
    }

    public  GlobalResponse<Inscripcion> selectId(Integer id) {

        Inscripcion usuario = repository.findById(id).get();

        GlobalResponse response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(usuario);

        return response;
    }

    public GlobalResponse<List<Inscripcion>> selectAll() {
        List<Inscripcion> inscripcions = repository.findAll();
        GlobalResponse<List<Inscripcion>> response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(inscripcions);
        return response;
    }

    public GlobalResponse<List<Inscripcion>> inscripcionesIdUsuario(Integer id) {
        List<Inscripcion> inscripcions = repository.inscripcionesIdUsuario(id);
        GlobalResponse<List<Inscripcion>> response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(inscripcions);
        return response;
    }

    public GlobalResponse<List<Inscripcion>> selectAllxEventos(Integer idEvento) {
        List<Inscripcion> inscripcions = repository.selectAllxEventos(idEvento);
        GlobalResponse<List<Inscripcion>> response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(inscripcions);
        return response;
    }

}
