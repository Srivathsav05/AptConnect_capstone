package com.AptConnect.UserManagement.repository;

import com.AptConnect.UserManagement.model.Parking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingRepository extends JpaRepository<Parking, Long> {
//    Parking findByParkingSlotNumber(String parkingSlotNumber);
}

