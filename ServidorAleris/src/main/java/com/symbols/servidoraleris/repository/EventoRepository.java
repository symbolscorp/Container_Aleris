package com.symbols.servidoraleris.repository;

import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la entidad {@link Evento}.
 * Provee operaciones CRUD sobre la tabla {@code evento}.
 */
@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
    @Query("SELECT i FROM Evento i WHERE i.estado = 'Activo' ")
    List<Evento> selectAllActivos();
}
