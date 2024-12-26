package com.example.demo.entity;

public class UserRequest {
    private String id;
    private String email;
    private String password;
    private String displayName;
    private String role;
    private String street;
    private String city;
    private String contact;
    private String image;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getContact() { return contact; }
    public String getId() {return id;}
    public void setId(String id) {this.id = id;}
    public void setContact(String contact) { this.contact = contact; }

    public String getImage() {return image;}
    public void setImage(String image) {this.image = image;}
}
