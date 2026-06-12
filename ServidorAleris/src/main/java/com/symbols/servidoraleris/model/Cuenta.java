package com.symbols.servidoraleris.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name = "cuenta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "inscripcion", length = 250)
    private String inscripcion;

    @Column(name = "visitas")
    private Integer visitas;

    @Column(name = "puntos")
    private Integer puntos;

    @Column(name = "nivel", length = 45)
    private String nivel;

    @Column(name = "posicion", length = 45)
    private String posicion;

    @OneToMany(mappedBy = "cuenta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Inscripcion> inscripciones;
}
