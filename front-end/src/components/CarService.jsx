import React, { useState } from 'react';
import Header from './header';
import '../styles/CarService.css';

const CarService = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    
    };

    return (
        <div>
            <Header />
            <div className="car-service">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search cars..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
               
            </div>
        </div>
    );
};

export default CarService;