package com.symbols.servidoraleris.repository;

import com.symbols.servidoraleris.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface DashboardRepository extends JpaRepository<Usuario, Integer> {

    @Query(value = """
    SELECT
        (SELECT COUNT(*) FROM usuario),
        (SELECT COUNT(*) FROM evento),
        (SELECT COUNT(*) FROM club),
        (SELECT COUNT(*) FROM cancha),
        (SELECT COUNT(DISTINCT distrito) FROM cancha)
    """, nativeQuery = true)
    List<Object[]> obtenerResumen();
}
