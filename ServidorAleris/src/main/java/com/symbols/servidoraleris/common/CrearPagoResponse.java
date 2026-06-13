package com.symbols.servidoraleris.common;

public class CrearPagoResponse {
    private String formToken;
    private String publicKey;

    public CrearPagoResponse(String formToken, String publicKey) {
        this.formToken = formToken;
        this.publicKey = publicKey;
    }

    public String getFormToken() { return formToken; }
    public String getPublicKey() { return publicKey; }
}