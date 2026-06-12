package com.symbols.servidoraleris.modeldto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagoRequest {

    private String token;
    private BigDecimal monto;
    private String email;
    private String descripcion;
    private String nombre;
    private String apellido;
    private String telefono;
}
