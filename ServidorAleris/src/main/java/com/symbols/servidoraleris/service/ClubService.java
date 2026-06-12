package com.symbols.servidoraleris.service;

import com.symbols.servidoraleris.common.GlobalResponse;
import com.symbols.servidoraleris.model.Club;
import com.symbols.servidoraleris.model.Usuario;
import com.symbols.servidoraleris.repository.ClubRepository;
import com.symbols.servidoraleris.util.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository repository;


    public GlobalResponse<List<Club>> selectAll() {

        List<Club> clubs = repository.findAll();

        GlobalResponse<List<Club>> response = new GlobalResponse();
        response.setMessage("Transaccion Existosa");
        response.setData(clubs);

        return response;
    }

}
