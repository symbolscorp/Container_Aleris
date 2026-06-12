package com.symbols.servidoraleris.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.util.List;

/**
 * Entidad JPA que representa la tabla {@code evento} en la base de datos ssadb.
 */
@Entity
@Table(name = "evento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Evento {

    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cancha_id", nullable = false)
    private Cancha cancha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id", nullable = false)
    private Club club;

    @Column(name = "descripcion", length = 250)
    private String descripcion;
    @Column(name = "fecha", length = 250)
    private String fecha;
    @Column(name = "turno", length = 250)
    private String turno;
    @Column(name = "horainicio", length = 250)
    private String horainicio;
    @Column(name = "horafin", length = 250)
    private String horafin;
    @Column(name = "costo", precision = 10, scale = 2)
    private BigDecimal costo;
    @Column(name = "integrantes")
    private Integer integrantes;

    @Column(name = "estado", length = 250)
    private String estado;

    @Column(name = "nivel", length = 250)
    private String nivel;

    @Column(name = "inscritos", length = 250)
    private Integer inscritos;

    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Inscripcion> inscripciones;
}
