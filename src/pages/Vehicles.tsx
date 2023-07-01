import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiRequestContext from '../context/ApiRequestContext';
import { Vehicle } from '../type';
import Loading from './Loading';
import '../css/vehicles.css'

function Vehicles() {
  const navigate = useNavigate();
  const apiRequestContext = useContext<React.ContextType<typeof ApiRequestContext>>(ApiRequestContext);


  const handleButtonClick = () => {
    navigate('/checkout');
  };

  return (
    <div className="vehicles-container">
      <div className="vehicles-title">Vehicles Star Wars</div>
      {!apiRequestContext?.isLoading ? (
        apiRequestContext?.vehicles.map((vehicle: Vehicle, index: number) => (
          <button
            key={index}
            type="button"
            onClick={handleButtonClick}
            className="vehicles-button"
            data-testid={`${index}-vehicles-card`}
          >
            <div className="vehicles-name">Name: {vehicle.name}</div>
            <br />
            <div className="vehicles-info">Model: {vehicle.model}</div>
            <br />
            <div className="vehicles-info">Manufacturer: {vehicle.manufacturer}</div>
            <br />
            <div className="vehicles-info">Cost in credits: {vehicle.cost_in_credits}</div>
            <br />
            <div className="vehicles-info">Length: {vehicle.length}</div>
            <br />
            <div className="vehicles-info">Max atmosphering speed: {vehicle.max_atmosphering_speed}</div>
            <br />
            <div className="vehicles-info">Crew: {vehicle.crew}</div>
          </button>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Vehicles;
