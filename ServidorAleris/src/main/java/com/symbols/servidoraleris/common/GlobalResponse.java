package com.symbols.servidoraleris.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GlobalResponse<T> {
    private boolean status = true;
    private String message;
    private T data;
}