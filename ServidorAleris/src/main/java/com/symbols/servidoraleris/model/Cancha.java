package com.symbols.servidoraleris.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * Entidad JPA que representa la tabla {@code cancha} en la base de datos ssadb.
 */
@Entity
@Table(name = "cancha")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cancha {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "descripcion", length = 250)
    private String descripcion;

    @Column(name = "departamento", length = 250)
    private String departamento;

    @Column(name = "provincia", length = 250)
    private String provincia;

    @Column(name = "distrito", length = 250)
    private String distrito;

    @Column(name = "direccion", length = 250)
    private String direccion;

    @Column(name = "latitud", length = 250)
    private String latitud;

    @Column(name = "longitud", length = 250)
    private String longitud;

    @Column(name = "foto", columnDefinition = "MEDIUMTEXT")
    private String foto;

    /** Lista de eventos programados en esta cancha. */
    @OneToMany(mappedBy = "cancha", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Evento> eventos;
}
