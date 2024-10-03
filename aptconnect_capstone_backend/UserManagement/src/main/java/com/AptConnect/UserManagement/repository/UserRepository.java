package com.AptConnect.UserManagement.repository;

import com.AptConnect.UserManagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByEmail(String email);
    boolean existsByRole(String role);
}

