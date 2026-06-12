package com.symbols.servidoraleris.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class IResponse {
    String status;
    String message;
    String type;
    Object data;
    List<Object> list;
}
