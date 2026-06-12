package com.symbols.servidoraleris.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * Entidad JPA que representa la tabla {@code usuario} en la base de datos ssadb.
 */
@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nombre", length = 250)
    private String nombre;

    @Column(name = "apellido", length = 250)
    private String apellido;

    @Column(name = "nacimiento", length = 250)
    private String nacimiento;

    @Column(name = "apodo", length = 250)
    private String apodo;

    @Column(name = "registro", length = 250)
    private String registro;

    @Column(name = "dni", length = 250)
    private String dni;

    @Column(name = "genero", length = 250)
    private String genero;

    @Column(name = "telefono", length = 250)
    private String telefono;

    @Column(name = "email", length = 250)
    private String email;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Cuenta> cuentas;
}
