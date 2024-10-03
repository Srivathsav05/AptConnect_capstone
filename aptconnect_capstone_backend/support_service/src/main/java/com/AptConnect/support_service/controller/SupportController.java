package com.AptConnect.support_service.controller;
import com.AptConnect.support_service.model.Support;

import java.util.List;

import com.AptConnect.support_service.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/help")
@CrossOrigin(origins = "http://localhost:4200/")
public class SupportController {
    @Autowired
    private SupportService supportService;



    @GetMapping("/getAll")
    public List<Support> getAllHelpRequests() {
        return this.supportService.getAllHelpRequests();
    }

    @PostMapping("/create")
    public Support createHelpRequest(@RequestBody Support supportRequest) {
        return this.supportService.createHelpRequest(supportRequest);
    }
}

