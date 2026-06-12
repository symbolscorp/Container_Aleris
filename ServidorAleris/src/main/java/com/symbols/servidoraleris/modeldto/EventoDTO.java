package com.symbols.servidoraleris.modeldto;

import com.symbols.servidoraleris.model.Cancha;
import lombok.*;

import java.math.BigDecimal;

/**
 * DTO para la entidad {@link com.symbols.servidoraleris.model.Evento}.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventoDTO {

    private Integer id;

    private String descripcion;
    private String fecha;
    private String turno;
    private String horainicio;
    private String horafin;
    private BigDecimal costo;
    private String estado;
    private Integer integrantes;
    private String nivel;
    private CanchaDTO cancha;
    private ClubDTO club;
    private Integer inscritos;
}

