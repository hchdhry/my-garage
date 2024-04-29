import React, { useState } from 'react';
import Header from '../components/header';
import CarCard from '../components/CarCard';

const CarService = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5003/api/Car/full?MakeQuery=${searchTerm}`);
            const data = await response.json();
            setData(data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header />
            <div className="container mx-auto py-10">
                <form onSubmit={handleSubmit} className="flex justify-center mb-8">
                    <div className="search-bar flex items-center bg-gray-800 rounded-md px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search cars..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="bg-transparent text-gray-300 placeholder-gray-500 outline-none flex-grow"
                        />
                        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300">
                            Submit
                        </button>
                    </div>
                </form>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.length > 0 ? (
                        data.map((car, index) => <CarCard key={index} carData={car} />)
                    ) : (
                        <p className="text-lg text-gray-400 text-center">Loading...</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default CarService;