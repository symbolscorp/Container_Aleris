package com.symbols.servidoraleris.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Clase genérica para estandarizar las respuestas de la API REST.
 *
 * @param <T> tipo del dato retornado
 */
@Getter
@Setter
@AllArgsConstructor
@Builder
public class ApiResponse<T> {

    /** Indica si la operación fue exitosa. */
    private boolean success;

    /** Mensaje descriptivo del resultado. */
    private String message;

    /** Dato retornado por la operación. */
    private T data;

    /**
     * Crea una respuesta exitosa con datos.
     *
     * @param data    objeto de respuesta
     * @param message mensaje informativo
     * @param <T>     tipo del dato
     * @return ApiResponse exitosa
     */
    public static <T> ApiResponse<T> ok(T data, String message) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .build();
    }

    /**
     * Crea una respuesta de error.
     *
     * @param message mensaje de error
     * @param <T>     tipo del dato
     * @return ApiResponse con error
     */
    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .data(null)
                .build();
    }
}
