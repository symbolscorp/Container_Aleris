package com.symbols.servidoraleris.repository;

import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CuentaRepository extends JpaRepository<Cuenta, Integer> {

    @Query("SELECT i FROM Cuenta i WHERE i.usuario.id = :cuentaId")
    List<Cuenta> findByCuentaId(@Param("cuentaId") Integer cuentaId);

    @Query("SELECT i FROM Cuenta i WHERE i.usuario.dni = :cuentaId")
    List<Cuenta> findByCuentaDni(@Param("cuentaId") Integer cuentaId);

}
