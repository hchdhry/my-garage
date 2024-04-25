import { useState } from 'react';

const CarCard = ({ carData }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white">{carData.make} {carData.model}</h2>
            <p className="text-gray-400 mb-4">Year: {carData.year}</p>
            <button
                onClick={() => setShowMore((prevState) => !prevState)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
                {showMore ? 'Show Less' : 'Show More'}
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