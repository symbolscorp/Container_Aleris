package com.symbols.servidoraleris.modeldto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CrearPagoRequest {
    private Double monto;
    private String orderNumber;
    private String email;
    private String nombres;
    private String apellidos;
}