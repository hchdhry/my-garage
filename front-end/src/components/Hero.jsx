import { useState, useEffect,createContext } from 'react';
import CarCard from './CarCard';


export const TokenContext = createContext(); 
const Hero = () => {
    const jwtToken = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const randomCarsX3 = data.length >= 3 ? [...data].sort(() => Math.random() - 0.5).slice(0, 3) : data;

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
        <main className="bg-gray-900 text-white">
            <section className="py-10">
                <h1 className="text-3xl font-bold text-center mb-4">My garage</h1>
                <p className="text-lg text-gray-400 text-center">the online car talk community</p>
            </section>
            <section className="py-10 min-h-screen flex justify-center items-center">
                {randomCarsX3.length > 0 ? (
                    <TokenContext.Provider value={jwtToken}>
                        {randomCarsX3.map((car, index) => (
                            <CarCard key={index} carData={car} />
                        ))}
                    </TokenContext.Provider>
                ) : (
                    <p className="text-lg text-gray-400 text-center">Loading...</p>
                )}
            </section>
        </main>
    );
};

export default Hero;