package com.example.demo.service;

import com.example.demo.entity.Car;
import com.example.demo.repository.CarRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class CarService {
    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() throws ExecutionException, InterruptedException {
        return carRepository.getAllCars();
    }

    public String addVehicle(String name, String type, String fuel, String price, String features, String seats) {
        try {

            carRepository.addVehicle(name,type,fuel,price,features,seats);

            return "Car added successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "failed: " + e.getMessage();
        }
    }

}
