import { useState, useEffect } from 'react';
import CarCard from './CarCard';

const Hero = () => {
    const [data, setData] = useState([]);

    const randomCarsX3 = data.length >= 3
        ? [...data].sort(() => Math.random() - 0.5).slice(0, 3)
        : data;

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5003/api/Car/full');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main>
            <section>
                <h1>My garage</h1>
                <p>the online car talk community</p>
            </section>
            <section>
                {randomCarsX3.length > 0 ? (
                    randomCarsX3.map((car, index) => <CarCard key={index} carData={car} />)
                ) : (
                    <p>Loading...</p>
                )}
            </section>
        </main>
    );
};

export default Hero;