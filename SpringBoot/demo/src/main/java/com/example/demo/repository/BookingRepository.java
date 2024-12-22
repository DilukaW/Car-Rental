package com.example.demo.repository;

import com.example.demo.entity.Booking;
import com.example.demo.entity.Car;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    public List<Booking> getAllBookings() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference bookingsRef = db.collection("Bookings");

        ApiFuture<QuerySnapshot> future = bookingsRef.get();
        List<Booking> bookingList = new ArrayList<>();
        future.get().getDocuments().forEach(doc -> {
            Booking booking = doc.toObject(Booking.class);
            booking.setId(doc.getId());
            bookingList.add(booking);
        });

        return bookingList;
    }

    public void updatePayment(String bookingId, String payment) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("Bookings").document(bookingId);

        // Prepare the updated data (only payment field)
        Map<String, Object> updatedPayment = new HashMap<>();
        updatedPayment.put("payment", payment != null ? payment : "");  // Set payment to provided value or empty if null

        // Update the payment field in Firestore
        docRef.update(updatedPayment).get();  // Use .get() to block until the update completes
    }



}
