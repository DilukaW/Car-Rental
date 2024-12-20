package com.example.demo.repository;

import com.example.demo.entity.Car;
import com.example.demo.entity.Driver;
import com.example.demo.service.DriverService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
@Repository
public class DriverRepository {

    public void addDriver(String name, String email, String contact) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("Drivers").document();

        Map<String, Object> driverDetails = new HashMap<>();

        driverDetails.put("name", name);
        driverDetails.put(email, email);
        driverDetails.put("contact", contact);

        // Add the document to Firestore
        docRef.set(driverDetails);
    }


    public List<Driver> getAllDrivers() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference driversRef = db.collection("Drivers");

        ApiFuture<QuerySnapshot> future = driversRef.get();
        List<Driver> driverList = new ArrayList<>();
        future.get().getDocuments().forEach(doc -> {
            Driver driver = doc.toObject(Driver.class);
            driver.setId(doc.getId());
            driverList.add(driver);
        });

        return driverList;
    }

    public void deleteDriver(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("Drivers").document(id);

        try {
            // Attempt to delete the document
            docRef.delete().get();
        } catch (FirestoreException e) {
            throw new RuntimeException("Failed to delete driver with ID: " + id, e);
        }
    }

}
