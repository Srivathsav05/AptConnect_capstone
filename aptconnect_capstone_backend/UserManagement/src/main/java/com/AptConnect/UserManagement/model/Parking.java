package com.AptConnect.UserManagement.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "parking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Parking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String parkingSlotNumber;
    private String UserName;
    private String guestName;
    private String userId;
    private LocalDate date=LocalDate.now();


}
