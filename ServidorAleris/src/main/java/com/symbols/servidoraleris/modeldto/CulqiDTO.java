package com.symbols.servidoraleris.modeldto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CulqiDTO {
    BigDecimal monto;
    String descripcion;
    String nombre;
    String apellido;
    String correo;
    String telefono;
}
