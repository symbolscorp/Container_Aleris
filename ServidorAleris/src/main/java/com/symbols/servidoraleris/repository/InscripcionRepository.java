package com.symbols.servidoraleris.repository;

import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InscripcionRepository extends JpaRepository<Inscripcion, Integer> {

    @Query("SELECT i FROM Inscripcion i WHERE i.cuenta.usuario.id = :usuarioId")
    List<Inscripcion> inscripcionesIdUsuario(@Param("usuarioId") Integer usuarioId);

    @Query("""
           SELECT COUNT(i) > 0
           FROM Inscripcion i
           WHERE i.cuenta.id = :cuentaId
           AND i.evento.id = :eventoId
           """)
    boolean existeInscripcion(
            @Param("cuentaId") Integer cuentaId,
            @Param("eventoId") Integer eventoId
    );

    @Query("SELECT i FROM Inscripcion i WHERE i.evento.id = :idEvento")
    List<Inscripcion> selectAllxEventos(@Param("idEvento") Integer idEvento);

}
