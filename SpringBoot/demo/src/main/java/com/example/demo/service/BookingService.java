package com.example.demo.service;

import com.example.demo.entity.Booking;
import com.example.demo.entity.Car;
import com.example.demo.repository.BookingRepository;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public String addBooking(String id,String userId,String rentalType, String  pickupLocation,
                           String  dropoffLocation, String dropoffDate,
                           String dropoffTime, String depositOption,
                           String price, String  pickupDate,
                           String  pickupTime) throws ExecutionException, InterruptedException {
      try{
          bookingRepository.addBooking(id,userId,rentalType,pickupLocation,dropoffLocation,dropoffDate,dropoffTime,depositOption,price,pickupDate,pickupTime);
          return "Booking added successfully!";
      } catch (Exception e) {
          e.printStackTrace();
          return "failed: " + e.getMessage();
      }
    }

    public List<Booking> getAllBookings() throws ExecutionException, InterruptedException {
        return bookingRepository.getAllBookings();
    }

    public void updatePayment(String bookingId, String payment)throws ExecutionException, InterruptedException {
        bookingRepository.updatePayment(bookingId,payment);
    }
}
