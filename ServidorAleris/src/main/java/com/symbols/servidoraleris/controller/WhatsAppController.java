package com.symbols.servidoraleris.controller;

import com.symbols.servidoraleris.service.WhatsAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/whatsapp")
public class WhatsAppController {

    @Autowired
    private WhatsAppService service;

    @PostMapping("/send")
    public String send(@RequestBody Map<String, String> body) {
        return service.sendMessage(body.get("number"), body.get("text"));
    }
}
