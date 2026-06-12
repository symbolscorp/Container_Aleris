package com.symbols.servidoraleris.repository;

import com.symbols.servidoraleris.model.Cuenta;
import com.symbols.servidoraleris.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    @Query("SELECT u FROM Usuario u WHERE u.dni = :dni")
    Optional<Usuario> findByDni(@Param("dni") String dni);

    @Query("SELECT u FROM Usuario u WHERE u.telefono = :telefono")
    Optional<Usuario> findByTelefono(@Param("telefono") String telefono);

    @Query("SELECT c FROM Cuenta c WHERE c.usuario.id = :usuarioId")
    List<Cuenta> findByUsuarioId(@Param("usuarioId") Integer usuarioId);

}
