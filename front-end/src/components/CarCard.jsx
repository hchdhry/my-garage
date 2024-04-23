import { useState } from 'react';
import '../styles/CarCard.css';

const CarCard = ({ carData }) => {
    const [showMore, setShowMore] = useState(false);
   
//test//
    return (
        <div className="card-container">
            <h2 className="card-title">{carData.make} {carData.model}</h2>
            <p className="card-info">Year: {carData.year}</p>
            <button onClick={()=>{setShowMore((prevState)=>!prevState)}}>{showMore ? 'Show Less' : 'Show More'}</button>
            {showMore && (
                <>
                    <p className="card-info">Fuel Type: {carData.fuelType || '-'}</p>
                    <p className="card-info">Drive: {carData.drive}</p>
                    <p className="card-info">Cylinders: {carData.cylinders}</p>
                    <p className="card-info">Transmission: {carData.transmission}</p>
                    <p className="card-info">Min City MPG: {carData.minCityMpg || '-'}</p>
                    <p className="card-info">Max City MPG: {carData.maxCityMpg || '-'}</p>
                    <p className="card-info">Min Highway MPG: {carData.minHwyMpg || '-'}</p>
                    <p className="card-info">Max Highway MPG: {carData.maxHwyMpg || '-'}</p>
                    <p className="card-info">Min Combined MPG: {carData.minCombMpg || '-'}</p>
                    <p className="card-info">Max Combined MPG: {carData.maxCombMpg || '-'}</p>
                    <p className="card-info">Limit: {carData.limit || '-'}</p>

                </>
            )}
        </div>
    );
};

export default CarCard;