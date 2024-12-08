import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Search cars by name or description..."
            value={query}
            onChange={handleInputChange}
        />
    );
};

export default SearchBar;
