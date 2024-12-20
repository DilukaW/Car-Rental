package com.example.demo.controller;
import com.example.demo.entity.Car;
import com.example.demo.entity.UserRequest;
import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRequest userRequest) {
        String response = userService.registerUser(
                userRequest.getEmail(),
                userRequest.getPassword(),
                userRequest.getDisplayName(),
                userRequest.getRole(),
                userRequest.getStreet(),
                userRequest.getCity(),
                userRequest.getContact()

        );
        if (response.startsWith("User registered successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @CrossOrigin
    @GetMapping("/users/{userId}")
    public UserRequest getUserById(@PathVariable String userId) throws ExecutionException, InterruptedException {
        return userService.getUserById(userId);
    }

    @CrossOrigin
    @PutMapping("/users/{userId}")
    public ResponseEntity<UserRequest> updateUser(
            @PathVariable String userId,
            @RequestBody UserRequest updatedUser) throws ExecutionException, InterruptedException {

        // Call the service to update the user and retrieve the updated user data
        UserRequest updatedUserData = userService.updateUser(userId, updatedUser);

        if (updatedUserData != null) {
            // Return the updated user data with a 200 OK status
            return ResponseEntity.ok(updatedUserData);
        } else {
            // If the user was not found or update failed, return a 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @CrossOrigin
    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Retrieve the session if it exists
        if (session != null) {
            session.invalidate(); // Invalidate the session
        }
        return ResponseEntity.ok("Logged out successfully");
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestParam String token) {
//        try {
//            FirebaseAuth.getInstance().verifyIdToken(token);
//            return ResponseEntity.ok("Token is valid");
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body("Invalid token: " + e.getMessage());
//        }
//    }
}
