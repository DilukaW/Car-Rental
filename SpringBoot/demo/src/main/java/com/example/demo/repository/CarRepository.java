package com.example.demo.repository;

import com.example.demo.entity.Car;
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
public class CarRepository {

    public List<Car> getAllCars() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference carsRef = db.collection("Cars");

        ApiFuture<QuerySnapshot> future = carsRef.get();
        List<Car> carList = new ArrayList<>();
        future.get().getDocuments().forEach(doc -> {
            Car car = doc.toObject(Car.class);
            car.setId(doc.getId());
            carList.add(car);
        });

        return carList;
    }

    public void addVehicle(String name, String type, String fuel, String price, String features,String seats) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("Cars").document();

        Map<String, Object> carDetails = new HashMap<>();

        carDetails.put("name", name);
        carDetails.put("type", type);
        carDetails.put("fuel", fuel);

        carDetails.put("price", price);
        carDetails.put("features", features);
        carDetails.put("seats",seats);

        // Add the document to Firestore
        docRef.set(carDetails);
    }

    // Delete a vehicle from Firestore by ID
    public void deleteVehicle(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("Cars").document(id);

        try {
            // Attempt to delete the document
            docRef.delete().get();
        } catch (FirestoreException e) {
            throw new RuntimeException("Failed to delete vehicle with ID: " + id, e);
        }
    }
}
