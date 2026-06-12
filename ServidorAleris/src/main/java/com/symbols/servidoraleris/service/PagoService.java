package com.symbols.servidoraleris.service;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.model.Pago;
import com.symbols.servidoraleris.repository.PagoRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private EntityManager entityManager;

    public GlobalResponse<Pago> insert(Pago pago) {
        GlobalResponse<Pago> response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        pagoRepository.saveAndFlush(pago);
        entityManager.clear();
        pago = pagoRepository.findById(pago.getId()).get();
        response.setData(pago);
        return response;
    }
    public GlobalResponse<Pago>  update(Pago obj) {
        GlobalResponse<Pago>  response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        pagoRepository.saveAndFlush(obj);
        entityManager.clear();
        obj = pagoRepository.findById(obj.getId()).get();
        response.setData(obj);
        entityManager.clear();
        return response;
    }
}
