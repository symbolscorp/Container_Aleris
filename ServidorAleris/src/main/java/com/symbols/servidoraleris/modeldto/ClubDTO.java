package com.symbols.servidoraleris.modeldto;

import lombok.*;

/**
 * DTO para la entidad {@link com.symbols.servidoraleris.model.Club}.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClubDTO {

    private Integer id;

    private String descripcion;

    private String logo;
}
