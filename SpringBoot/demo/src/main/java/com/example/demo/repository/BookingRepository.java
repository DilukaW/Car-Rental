package com.example.demo.repository;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Repository
public class BookingRepository {

    public void addBooking(String id, String userId,String rentalType, String  pickupLocation, String  dropoffLocation, String dropoffDate, String dropoffTime, String depositOption, String price, String  pickupDate, String  pickupTime) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("Bookings").document(id);

        Map<String, Object> bookingDetails = new HashMap<>();

        bookingDetails.put("userId",userId);
        bookingDetails.put("payment","");
        bookingDetails.put("rentalType",rentalType);
        bookingDetails.put("pickupLocation", pickupLocation);
        bookingDetails.put("dropoffLocation",  dropoffLocation);
        bookingDetails.put("dropoffDate", dropoffDate);
        bookingDetails.put("dropoffTime", dropoffTime);
        bookingDetails.put("depositOption", depositOption);
        bookingDetails.put("price",price);
        bookingDetails.put("pickupDate",pickupDate);
        bookingDetails.put("pickupTime",pickupTime);

        // Add the document to Firestore
        docRef.set(bookingDetails);
    }
}
