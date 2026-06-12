package com.symbols.servidoraleris.modeldto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {

    private Integer id;
    private String nombre;
    private String apellido;
    private String nacimiento;
    private String apodo;
    private String registro;
    private String dni;
    private String genero;
    private String telefono;
    private String email;
}

