import { useState,useContext } from 'react';
import { TokenContext } from './Hero'
const CarCard = ({ carData }) => {

    const [showMore, setShowMore] = useState(false);
    const jwtToken = localStorage.getItem("token");
    const carId = carData.id;


    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:5003/api/Garage", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carId) 
            });

            if (response.ok) {
                alert('Car added to your garage!');
            } else {
                const error = await response.json();
                alert(`Error adding car to garage: ${error.title}`); 
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the car to your garage.');
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white">{carData.make} {carData.model}</h2>
            <p className="text-gray-400 mb-4">Year: {carData.year}</p>
            {jwtToken && (
                <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 mb-4">
                    Add to Garage
                </button>
            )}
            <button
                onClick={() => setShowMore((prevState) => !prevState)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
                {showMore ? 'Show Less' : 'Show More'}
            </button>
            <button
            
            > 
            add to garage

            </button>
            {showMore && (
                <>
                    <p className="text-gray-400 mt-4">Fuel Type: {carData.fuelType || '-'}</p>
                    <p className="text-gray-400">Drive: {carData.drive}</p>
                    <p className="text-gray-400">Cylinders: {carData.cylinders}</p>
                    <p className="text-gray-400">Transmission: {carData.transmission}</p>
                    <p className="text-gray-400">Min City MPG: {carData.minCityMpg || '-'}</p>
                    <p className="text-gray-400">Max City MPG: {carData.maxCityMpg || '-'}</p>
                    <p className="text-gray-400">Min Highway MPG: {carData.minHwyMpg || '-'}</p>
                    <p className="text-gray-400">Max Highway MPG: {carData.maxHwyMpg || '-'}</p>
                    <p className="text-gray-400">Min Combined MPG: {carData.minCombMpg || '-'}</p>
                    <p className="text-gray-400">Max Combined MPG: {carData.maxCombMpg || '-'}</p>
                    <p className="text-gray-400">Limit: {carData.limit || '-'}</p>
                </>
            )}
        </div>
    );
};

export default CarCard;