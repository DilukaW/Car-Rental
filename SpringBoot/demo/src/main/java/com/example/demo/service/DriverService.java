package com.example.demo.service;

import com.example.demo.entity.Driver;
import com.example.demo.repository.DriverRepository;
import com.google.cloud.firestore.FirestoreException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
@Service

public class DriverService {

    private final DriverRepository driverRepository;


    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public List<Driver> getAllDrivers() throws ExecutionException, InterruptedException {
        return driverRepository.getAllDrivers();
    }
    public String addDriver(String name, String email, String contact) {
        try {

            driverRepository.addDriver(name,email,contact);

            return "Driver added successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "failed: " + e.getMessage();
        }
    }

    public String deleteDriver(String id) throws ExecutionException, InterruptedException {
        try {
            driverRepository.deleteDriver(id);
            return "Driver deleted successfully!";
        } catch (FirestoreException e) {
            e.printStackTrace();
            return "failed: " + e.getMessage();
        }
    }

}
