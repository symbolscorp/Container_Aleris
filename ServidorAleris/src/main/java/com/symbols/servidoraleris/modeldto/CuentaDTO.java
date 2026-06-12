package com.symbols.servidoraleris.modeldto;

import lombok.*;

/**
 * DTO para la entidad {@link com.symbols.servidoraleris.model.Cuenta}.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CuentaDTO {

    private Integer id;
    private String inscripcion;
    private Integer visitas;
    private Integer puntos;
    private String nivel;
    private String posicion;
    private UsuarioDTO usuario;
}
