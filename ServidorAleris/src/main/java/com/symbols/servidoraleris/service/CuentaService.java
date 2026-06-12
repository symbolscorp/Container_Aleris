package com.symbols.servidoraleris.service;

import com.symbols.servidoraleris.common.ErrorMessages;
import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.model.Club;
import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Usuario;
import com.symbols.servidoraleris.repository.ClubRepository;
import com.symbols.servidoraleris.repository.CuentaRepository;
import com.symbols.servidoraleris.repository.UsuarioRepository;
import com.symbols.servidoraleris.util.ResourceNotFoundException;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Servicio de negocio para la entidad {@link Cuenta}.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class CuentaService {

    private final CuentaRepository repository;
    private final UsuarioRepository usuarioRepository;
    private final ClubRepository clubRepository;

    @Autowired
    private EntityManager entityManager;

    public GlobalResponse<Cuenta>  insert(Cuenta obj) {
        GlobalResponse<Cuenta> response = new GlobalResponse();
        //Verifico que el usuario no tenga una cuenta con el mismo club

            response.setMessage("Transaccion Existosa");
            repository.saveAndFlush(obj);
            entityManager.clear();
            obj = repository.findById(obj.getId()).get();
            response.setData(obj);
            return response;

    }

    public GlobalResponse<Cuenta>  update(Cuenta obj) {
        GlobalResponse<Cuenta>  response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        repository.saveAndFlush(obj);
        entityManager.clear();
        obj = repository.findById(obj.getId()).get();
        response.setData(obj);
        entityManager.clear();
        return response;
    }

    @Transactional(readOnly = true)
    public GlobalResponse<Cuenta> selectId(Integer id) {
        Cuenta cuenta = repository.findById(id).get();
        GlobalResponse response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(cuenta);

        return response;
    }

    public GlobalResponse<List<Cuenta>>  cuentasIdUsuario(Integer id) {
        List<Cuenta> cuentas = repository.findByCuentaId(id);

        GlobalResponse<List<Cuenta>>  response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(cuentas);
        return response;
    }

    public GlobalResponse<List<Cuenta>> selectAll() {
        List<Cuenta> cuentas = repository.findAll();
        GlobalResponse<List<Cuenta>>  response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(cuentas);
        return response;
    }

    public GlobalResponse<Cuenta>  usuarioDni(Integer dni) {

        Cuenta cuentas = repository.findByCuentaDni(dni).get(0);

        GlobalResponse<Cuenta>  response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(cuentas);
        return response;
    }



}
