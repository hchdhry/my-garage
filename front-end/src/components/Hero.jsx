import { useState, useEffect } from 'react';

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
                <div>
                    {data.map((car, index) => (
                        <div key={index}>
                            <h2>{car.make}</h2>
                            <p>{car.model}</p>
                            <p>{car.year}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Hero;