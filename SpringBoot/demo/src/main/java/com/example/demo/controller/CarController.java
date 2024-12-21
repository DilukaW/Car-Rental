package com.example.demo.controller;

import com.example.demo.entity.Car;
import com.example.demo.entity.UserRequest;
import com.example.demo.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @CrossOrigin
    @GetMapping
    public List<Car> getAllCars() throws ExecutionException, InterruptedException {
        return carService.getAllCars();
    }


    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> addVehicle(@RequestBody Car car) {
        String response = carService.addVehicle(
                car.getName(),
                car.getType(),
                car.getFuel(),
                car.getImage(),
                car.getPrice(),
                car.getFeatures(),
                car.getSeats()
        );
        if (response.startsWith("Vehicle added successfully")) {
            return ResponseEntity.ok(response);
        } else {
            System.out.println(ResponseEntity.badRequest().body(response));
            return ResponseEntity.badRequest().body(response);

        }
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable String id) {
        try {
            carService.deleteVehicle(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @CrossOrigin
    @PutMapping("/{carId}")
    public ResponseEntity<Car> updateCar(
            @PathVariable String carId,
            @RequestBody Car updatedCar) throws ExecutionException, InterruptedException {

        // Call the service to update the user and retrieve the updated user data
        Car updatedCarData = carService.updateVehicle(carId, updatedCar);

        if (updatedCarData != null) {
            // Return the updated user data with a 200 OK status
            return ResponseEntity.ok(updatedCarData);
        } else {
            // If the user was not found or update failed, return a 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
