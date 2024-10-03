package com.AptConnect.UserManagement.service;

import com.AptConnect.UserManagement.model.Parking;
import com.AptConnect.UserManagement.repository.ParkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkingService {

    @Autowired
    private ParkingRepository parkingRepository;

    public Parking createParking(Parking parking) {
        return parkingRepository.save(parking);
    }

  public List<Parking> getParkingSlot() {
        return parkingRepository.findAll();
    }


}
