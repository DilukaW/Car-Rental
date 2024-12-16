package com.example.demo.repository;

import com.example.demo.entity.UserRequest;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.remoteconfig.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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


    public UserRequest getUserById(String userId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference userRef = db.collection("Users").document(userId);

        ApiFuture<com.google.cloud.firestore.DocumentSnapshot> future = userRef.get();
        com.google.cloud.firestore.DocumentSnapshot document = future.get();

        if (document.exists()) {
            UserRequest user = document.toObject(UserRequest.class);
            if (user != null) {
                user.setId(document.getId());
            }
            return user;
        } else {
            return null;
        }
    }

}
