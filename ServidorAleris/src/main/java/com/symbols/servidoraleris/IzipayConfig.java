package com.symbols.servidoraleris;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "izipay")
public class IzipayConfig {

    private String merchantCode;
    private String apiPassword;
    private String baseUrl;
    private String publicKey;

    public String getPublicKey() { return publicKey; }
    public void setPublicKey(String publicKey) { this.publicKey = publicKey; }
    // Getters y Setters
    public String getMerchantCode() { return merchantCode; }
    public void setMerchantCode(String merchantCode) { this.merchantCode = merchantCode; }

    public String getApiPassword() { return apiPassword; }
    public void setApiPassword(String apiPassword) { this.apiPassword = apiPassword; }

    public String getBaseUrl() { return baseUrl; }
    public void setBaseUrl(String baseUrl) { this.baseUrl = baseUrl; }
}