import React, { useState } from 'react';
import Header from './header';
import CarCard from './CarCard';
import '../styles/CarService.css';


const CarService = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data,setData] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    
    };
    const handleSubmit = async (e) =>
    {
        e.preventDefault(); 
        try{
        const response = await fetch(`http://localhost:5003/api/Car/full?MakeQuery=${searchTerm}`)
        const data = await response.json()
        setData(data)
        }
        catch(e)
        {console.log(e)
        }
    }

    return (
        <div>
            <Header />
            <div className="car-service">
                <form onSubmit={handleSubmit}>
                <div className="search-bar"> 
                    <input
                        type="text"
                        placeholder="Search cars..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" >submit</button>
                </div>
            </form>
                <section>
                    {data.length > 0 ? (
                        data.map((car, index) => <CarCard key={index} carData={car} />)
                    ) : (
                        <p>Loading...</p>
                    )}
                </section>
                
               
            </div>
        </div>
    );
};

export default CarService;