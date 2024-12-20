package com.example.demo.service;

import com.example.demo.entity.Car;
import com.example.demo.entity.UserRequest;
import com.example.demo.repository.CarRepository;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
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

    public String deleteVehicle(String id) throws ExecutionException, InterruptedException {
        try {
            carRepository.deleteVehicle(id);
            return "Car deleted successfully!";
        } catch (FirestoreException e) {
            e.printStackTrace();
            return "failed: " + e.getMessage();
        }
    }

    public Car updateVehicle(String carId, Car updatedCar)throws ExecutionException, InterruptedException {
        return carRepository.updateVehicle(carId,updatedCar);
    }

}
