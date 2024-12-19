package com.example.demo.controller;

import com.example.demo.entity.Car;
import com.example.demo.entity.UserRequest;
import com.example.demo.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/cars")
public class CarController {
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
}
