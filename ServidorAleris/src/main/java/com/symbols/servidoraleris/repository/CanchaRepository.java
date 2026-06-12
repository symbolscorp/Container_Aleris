package com.symbols.servidoraleris.repository;

import com.symbols.servidoraleris.model.Cancha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio JPA para la entidad {@link Cancha}.
 * Provee operaciones CRUD sobre la tabla {@code cancha}.
 */
@Repository
public interface CanchaRepository extends JpaRepository<Cancha, Integer> {
}
