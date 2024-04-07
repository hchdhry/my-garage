
import '../CarCard.css';

const CarCard = ({ carData }) => {
    return (
        <div className="card-container">
            <h2 className="card-title">{carData.make} {carData.model}</h2>
            <p className="card-info">Year: {carData.year}</p>
        </div>
    );
};

export default CarCard;