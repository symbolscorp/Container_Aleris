package com.symbols.servidoraleris.common;

public class ErrorMessages {

    private ErrorMessages() {
        // Evita instanciar la clase
    }

    public static final String USER_PHONE_EXISTS =
            "El teléfono ya está registrado";

    public static final String USER_NOT_FOUND =
            "Usuario no encontrado";

    public static final String INTERNAL_SERVER_ERROR =
            "Error interno del servidor";

    public static final String INVALID_DATA =
            "Datos inválidos";
    public static final String DNI_EXIST =
            "Este dni ya esta registrado";
    public static final String TELEFONO_EXIST =
            "Este numero ya esta registrado";

    public static final String USER_EXIST_INSCRIPTIONS =
            "Usuario ya tiene una Inscripción para ese Evento";
}
