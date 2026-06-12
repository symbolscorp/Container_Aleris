package com.symbols.servidoraleris.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * Entidad JPA que representa la tabla {@code inscripcion} en la base de datos ssadb.
 */
@Entity
@Table(name = "inscripcion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inscripcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cuenta_id", nullable = false)
    private Cuenta cuenta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;

    @Column(name = "pago", precision = 10, scale = 2)
    private BigDecimal pago;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "tipo", length = 250)
    private String tipo;

    @Column(name = "estado", length = 250)
    private String estado;




}
