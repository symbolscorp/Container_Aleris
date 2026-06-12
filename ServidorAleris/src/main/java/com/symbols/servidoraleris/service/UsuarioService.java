package com.symbols.servidoraleris.service;

import com.symbols.servidoraleris.common.ErrorMessages;
import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.model.Usuario;
import com.symbols.servidoraleris.repository.UsuarioRepository;
import com.symbols.servidoraleris.util.ResourceNotFoundException;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio de negocio para la entidad {@link Usuario}.
 * Implementa las operaciones CRUD básicas.
 */
@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;

    @Autowired
    private EntityManager entityManager;

    public GlobalResponse<Usuario> insert(Usuario obj) {

        GlobalResponse response = new GlobalResponse();

        Optional<Usuario> usuario = repository.findByDni(obj.getDni());

        if (usuario.isPresent()) {
            response.setStatus(false);
            response.setMessage(ErrorMessages.DNI_EXIST);
        }
        else {
            Optional<Usuario> usuario2 = repository.findByTelefono(obj.getTelefono());
            if(usuario2.isPresent()){
                response.setStatus(false);
                response.setMessage(ErrorMessages.USER_PHONE_EXISTS);
            }
            else {
                try {
                    response.setMessage("Transaccion Existosa");
                    repository.saveAndFlush(obj);
                    entityManager.clear();
                    obj = repository.findById(obj.getId()).get();
                    response.setData(obj);
                }
                catch (DataIntegrityViolationException e){
                    String mensaje = e.getMostSpecificCause().getMessage();
                    response.setStatus(false);
                    response.setMessage(mensaje);
                }

            }
        }
        return response;
    }


    public GlobalResponse<Usuario>  update(Usuario obj) {
        GlobalResponse response = new GlobalResponse();
        if (repository.findByDni(obj.getDni()).isPresent()) {
            response.setStatus(false);
            response.setMessage(ErrorMessages.DNI_EXIST);
        }
        else {
            response.setMessage("Transaccion Existosa");
            repository.saveAndFlush(obj);
            entityManager.clear();
            obj = repository.findById(obj.getId()).get();
            response.setData(obj);
            entityManager.clear();
        }
        return response;
    }

    public  GlobalResponse<Usuario> selectId(Integer id) {

        Usuario usuario = repository.findById(id).get();

        GlobalResponse response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(usuario);

        return response;
    }

    public GlobalResponse<List<Usuario>> selectAll() {
        List<Usuario> usuario = repository.findAll();

        GlobalResponse<List<Usuario>>  response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(usuario);

        return response;
    }


    public GlobalResponse<Usuario> findByDni(String dni){

        Usuario usuario = repository.findByDni(dni).get();

        GlobalResponse response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(usuario);

        return response;

    }
}
