package com.AptConnect.UserManagement.controller;

import com.AptConnect.UserManagement.model.User;
import com.AptConnect.UserManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
// Apply to all methods in this controller
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    @PostMapping("/login")

    public ResponseEntity<Object> loginUser(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByEmail(user.getEmail());

        // Check if the user exists and the password matches
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            // Create a response object with user role
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("role", existingUser.get().getRole()); // Assuming User has a getRole() method
            return ResponseEntity.ok(response);  // Return as JSON
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
        }
    }
}
