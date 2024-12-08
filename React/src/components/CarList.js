import React, { useState } from 'react';
import CarCard from './CarCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';

const CarList = () => {
    const cars = [
        {
            name: "Toyota Corolla",
            description: "Comfortable and reliable car for your trips.",
            price: 45,
            image: "https://via.placeholder.com/300x200?text=Toyota+Corolla",
            category: "Budget"
        },
        {
            name: "BMW 5 Series",
            description: "Luxury car with premium features and style.",
            price: 150,
            image: "https://via.placeholder.com/300x200?text=BMW+5+Series",
            category: "Luxury"
        },
        {
            name: "Honda Civic",
            description: "Fuel-efficient and affordable for daily use.",
            price: 40,
            image: "https://via.placeholder.com/300x200?text=Honda+Civic",
            category: "Budget"
        },
        {
            name: "Mercedes-Benz A-Class",
            description: "Stylish and compact luxury car for your travels.",
            price: 120,
            image: "https://via.placeholder.com/300x200?text=Mercedes+A-Class",
            category: "Luxury"
        }
    ];

    const [filteredCars, setFilteredCars] = useState(cars);

    const handleSearch = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const result = cars.filter(
            (car) =>
                car.name.toLowerCase().includes(lowerCaseQuery) ||
                car.description.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredCars(result);
    };

    const handleCategoryFilter = (category) => {
        if (category === "All") {
            setFilteredCars(cars);
        } else {
            const result = cars.filter((car) => car.category === category);
            setFilteredCars(result);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Search & Filter Cars</h2>
            <SearchBar onSearch={handleSearch} />
            <CategoryFilter onFilter={handleCategoryFilter} />
            <div className="row mt-4">
                {filteredCars.map((car, index) => (
                    <CarCard key={index} car={car} />
                ))}
            </div>
        </div>
    );
};

export default CarList;
