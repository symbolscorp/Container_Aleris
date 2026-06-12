package com.symbols.servidoraleris.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "pago")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "culqi")
    private String culqi; // chr_test_xxx

    @Column(name = "token")
    private String token; // tkn_test_xxx

    @Column(name = "monto")
    private BigDecimal monto;

    @Column(name = "email")
    private String email;

    @Column(name = "estado")
    private String estado; // EXITOSO / FALLIDO

    @Column(name = "inscripcion")
    private int inscripcion;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    @Column(name = "respuesta")
    private String respuesta;


}
