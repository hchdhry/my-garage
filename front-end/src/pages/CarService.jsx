import React, { useState } from 'react';
import Header from '../components/header';
import CarCard from '../components/CarCard';

const CarService = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const jwtToken = localStorage.getItem("token");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (event) => {
        const sortOption = event.target.value;
        setFilter(sortOption === 'date-asc' ? "AscendingByYear=true" : "");
        fetchData(searchTerm, sortOption === 'date-asc');
    };

    const fetchData = async (search, ascending = false) => {
        try {
            let url = `http://localhost:5003/api/Car/full?MakeQuery=${search}`;
            if (ascending) {
                url += "&AscendingByYear=true";
            }
            let response = await fetch(url);

            if (!response.ok) {
                response = await fetch(`http://localhost:5003/api/Car`, {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json-patch+json'
                    },
                    body: JSON.stringify(search)
                });
                if (response.ok) {
                    const newData = await response.json();
                    setData([newData]);
                } else {
                    console.log('Both requests failed');
                    setData([]);
                }
            } else {
                const fetchedData = await response.json();
                setData(fetchedData);
            }
        } catch (e) {
            console.log(e);
            setData([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchData(searchTerm, filter === "AscendingByYear=true");
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header />
            <div className="container mx-auto py-10">
                <div className="flex justify-end mb-4">
                    <select
                        onChange={handleSortChange}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md"
                    >
                        <option value="">Sort by</option>
                        <option value="date-asc">Date (Ascending)</option>
                    </select>
                </div>
                <form onSubmit={handleSubmit} className="flex justify-center mb-8">
                    <div className="search-bar flex items-center bg-gray-800 rounded-md px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search cars..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="bg-transparent text-gray-300 placeholder-gray-500 outline-none flex-grow"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
                        >
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