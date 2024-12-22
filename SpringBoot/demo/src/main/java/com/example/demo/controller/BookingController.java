package com.example.demo.controller;

import com.example.demo.entity.Booking;
import com.example.demo.entity.Car;
import com.example.demo.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }


    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> addBooking(@RequestBody Booking booking) throws ExecutionException, InterruptedException {
        String response = bookingService.addBooking(
                booking.getId(),
                booking.getUserId(),
                booking.getRentalType(),
                booking.getPickupLocation(),
                booking.getDropoffLocation(),
                booking.getDropoffDate(),
                booking.getDropoffTime(),
                booking.getDepositOption(),
                booking.getPrice(),
                booking.getPickupDate(),
                booking.getPickupTime()
        );

        if (response.startsWith("Vehicle added successfully")) {
            return ResponseEntity.ok(response);
        } else {
            System.out.println(ResponseEntity.badRequest().body(response));
            return ResponseEntity.badRequest().body(response);


        }
    }
    @CrossOrigin
    @GetMapping
    public List<Booking> getAllBookings() throws ExecutionException, InterruptedException {
        return bookingService.getAllBookings();
    }

    @CrossOrigin
    @PutMapping("/{bookingId}")
    public ResponseEntity<?> updatePayment(
            @PathVariable String bookingId,
            @RequestBody String payment) throws ExecutionException, InterruptedException {

       bookingService.updatePayment(bookingId,payment.toString());

        return ResponseEntity.ok(200);

    }

}
