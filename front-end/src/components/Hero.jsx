import { useState, useEffect } from 'react';
import CarCard from './CarCard';

const Hero = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5003/api/car');
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
                {data.length > 0 ? (
                    data.map((car, index) => <CarCard key={index} carData={car} />)
                ) : (
                    <p>Loading...</p>
                )}
            </section>
        </main>
    );
};

export default Hero;