import React from 'react';

const CategoryFilter = ({ onFilter }) => {
    const categories = ["All", "Luxury", "Budget"];

    return (
        <div className="d-flex justify-content-center mt-3">
            {categories.map((category) => (
                <button
                    key={category}
                    className="btn btn-outline-primary me-2"
                    onClick={() => onFilter(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
