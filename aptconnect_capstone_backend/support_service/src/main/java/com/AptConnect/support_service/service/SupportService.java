package com.AptConnect.support_service.service;


import com.AptConnect.support_service.model.Support;
import com.AptConnect.support_service.repository.SupportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupportService {

    private final SupportRepository supportRepository;

    public SupportService(SupportRepository supportRepository) {
        this.supportRepository = supportRepository;
    }


    public List<Support> getAllHelpRequests() {
        return (List<Support>) this.supportRepository.findAll();
    }

    public Support createHelpRequest(Support supportRequest) {
        try {
            return this.supportRepository.save(supportRequest);
        } catch (Exception e) {
            // Log the error
            System.err.println("Error saving support request: " + e.getMessage());
            throw e; // Re-throw or handle as appropriate
        }
    }
}
