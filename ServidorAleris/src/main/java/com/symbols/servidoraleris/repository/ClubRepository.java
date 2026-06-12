package com.symbols.servidoraleris.repository;

import com.symbols.servidoraleris.model.Club;
import com.symbols.servidoraleris.model.Cuenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la entidad {@link Club}.
 * Provee operaciones CRUD sobre la tabla {@code club}.
 */
@Repository
public interface ClubRepository extends JpaRepository<Club, Integer> {

}
