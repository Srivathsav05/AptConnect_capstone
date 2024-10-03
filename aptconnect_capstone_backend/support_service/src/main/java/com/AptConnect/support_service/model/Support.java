package com.AptConnect.support_service.model;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "support")
public class Support {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private  String name;
    private  String phoneNo;
    private String email;
    private  String helpSubject;
    private  String helpDescription;

}
