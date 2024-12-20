package com.example.demo.controller;

import com.example.demo.service.DriverService;
import com.example.demo.entity.Driver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/drivers")

public class DriverController {

    @Autowired
    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }


    @CrossOrigin
    @GetMapping
    public List<Driver> getAllDrivers() throws ExecutionException, InterruptedException {
        return driverService.getAllDrivers();
    }

    @CrossOrigin
    @PostMapping("/add")
    public ResponseEntity<?> addDriver(@RequestBody Driver driver) {
        String response =driverService.addDriver(
                driver.getName(),
                driver.getEmail(),
                driver.getContact()
        );
        if (response.startsWith("Driver added successfully")) {
            return ResponseEntity.ok(response);
        } else {
            System.out.println(ResponseEntity.badRequest().body(response));
            return ResponseEntity.badRequest().body(response);

        }
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable String id) {
        try {
            driverService.deleteDriver(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}