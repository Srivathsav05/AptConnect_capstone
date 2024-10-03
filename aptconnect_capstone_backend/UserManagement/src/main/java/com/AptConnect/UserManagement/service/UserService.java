package com.AptConnect.UserManagement.service;

import com.AptConnect.UserManagement.model.User;
import com.AptConnect.UserManagement.repository.ParkingRepository;
import com.AptConnect.UserManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParkingRepository parkingRepository;

    @Autowired
    private ParkingService parkingService;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject the PasswordEncoder

    public boolean adminExists() {
        return userRepository.existsByRole("ADMIN");
    }

    public User createUser(User user) {
        // If role is not provided, assign "USER" role
        if (user.getRole() == null || !"ADMIN".equals(user.getRole())) {
            user.setRole("USER");
        }

        // Check if the role is "ADMIN" and ensure only one admin exists
        if ("ADMIN".equals(user.getRole()) && adminExists()) {
            throw new IllegalStateException("Admin user already exists.");
        }

        // Encode the password before saving
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
