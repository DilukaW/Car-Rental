package com.example.demo.repository;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.DocumentReference;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
public class UserRepository {

    public void saveUserDetails(String userId, String email, String displayName, String role,String street,String city,String contact) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("Users").document(userId);

        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("email", email);
        userDetails.put("displayName", displayName);
        userDetails.put("role", role);
        userDetails.put("street", street);
        userDetails.put("contact", contact);
        userDetails.put("city", city);


        // Add the document to Firestore
        docRef.set(userDetails).get();
    }
}
