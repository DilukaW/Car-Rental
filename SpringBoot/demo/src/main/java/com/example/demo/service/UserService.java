package com.example.demo.service;

import com.example.demo.entity.Car;
import com.example.demo.entity.UserRequest;
import com.example.demo.repository.UserRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(String email, String password, String displayName, String role,String street,String city,String contact,String image) {
        try {
            // Create user in Firebase Authentication
            UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest()
                    .setEmail(email)
                    .setPassword(password)
                    .setDisplayName(displayName);
            UserRecord userRecord = FirebaseAuth.getInstance().createUser(createRequest);

            // Save additional details in Firestore
            userRepository.saveUserDetails(userRecord.getUid(), email, displayName, role,street,city,contact,image);

            return "User registered successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Registration failed: " + e.getMessage();
        }
    }

    public UserRequest getUserById(String userId) throws ExecutionException, InterruptedException {
        return userRepository.getUserById(userId);
    }

    public UserRequest updateUser(String userId, UserRequest updatedUser)throws ExecutionException, InterruptedException {
        return userRepository.updateUser(userId,updatedUser);
    }
}