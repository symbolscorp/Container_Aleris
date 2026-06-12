package com.symbols.servidoraleris.modeldto;

import lombok.*;

import java.math.BigDecimal;

/**
 * DTO para la entidad {@link com.symbols.servidoraleris.model.Inscripcion}.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InscripcionDTO {

    private Integer id;
    private CuentaDTO cuenta;
    private EventoDTO evento;
    private BigDecimal pago;
    private Integer numero;
    private String tipo;
    private String estado;

}
