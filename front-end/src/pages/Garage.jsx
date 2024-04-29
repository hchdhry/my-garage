import React, { useState,useEffect} from 'react';
import Header from '../components/header';
import CarCard from '../components/CarCard';
import GarageCard from '../components/GarageCard';

const Garage = () => {
   
    const [data, setData] = useState([]);
    const jwtToken = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5003/api/Garage', {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.log(error);
        }
    };
    const randomCarsX3 = data.length >= 3 ? [...data].sort(() => Math.random() - 0.5).slice(0, 3) : data;
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header />
            <div className="container mx-auto py-10">
                <main className="bg-gray-900 text-white">
                    <section className="py-10">
                        <h1 className="text-3xl font-bold text-center mb-4">your garage</h1>
                        <p className="text-lg text-gray-400 text-center">the online car talk community</p>
                    </section>
                    <section className="py-10">
                        {randomCarsX3.length > 0 ? (
                            randomCarsX3.map((car, index) => <GarageCard key={index} carData={car} />)
                        ) : (
                            <p className="text-lg text-gray-400 text-center">Loading...</p>
                        )}
                    </section>
                </main>
              
            </div>
        </div>
    );
};

export default Garage;