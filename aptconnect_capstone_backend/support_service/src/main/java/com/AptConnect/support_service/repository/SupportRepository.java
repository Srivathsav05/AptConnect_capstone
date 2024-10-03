package com.AptConnect.support_service.repository;


import com.AptConnect.support_service.model.Support;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportRepository extends JpaRepository<Support,Long> {
}
