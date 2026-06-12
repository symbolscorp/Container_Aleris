package com.symbols.servidoraleris.modeldto;

import lombok.*;

/**
 * DTO para la entidad {@link com.symbols.servidoraleris.model.Cancha}.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CanchaDTO {

    private Integer id;

    private String descripcion;

    private String departamento;

    private String provincia;

    private String distrito;

    private String direccion;

    private String latitud;

    private String longitud;

    private String foto;
}
