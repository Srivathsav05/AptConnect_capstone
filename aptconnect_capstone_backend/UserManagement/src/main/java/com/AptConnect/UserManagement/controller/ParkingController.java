package com.AptConnect.UserManagement.controller;

import com.AptConnect.UserManagement.model.Parking;
import com.AptConnect.UserManagement.service.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking")
public class ParkingController {

    @Autowired
    private ParkingService parkingService;

    @PostMapping
    public Parking createParking(@RequestBody Parking parking) {
        return parkingService.createParking(parking);
    }


    @GetMapping
    public List<Parking> getParkingSlot() {
        return parkingService.getParkingSlot();
    }



}
