import { useState, useEffect, useMemo, ReactNode } from 'react';
import PropTypes from 'prop-types';
import ApiRequestContext from './ApiRequestContext';
import { Vehicle } from '../type';

interface ApiRequestProviderProps {
  children: ReactNode;
}

function ApiRequestProvider({ children }: ApiRequestProviderProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);

      const response = await fetch('https://swapi.dev/api/vehicles/');

      const data = await response.json();

      setVehicles(data.results);

      setIsLoading(false);
    };
    fetchVehicles();
  }, []);

  const value = useMemo(
    () => ({
      vehicles,
      isLoading,
      setVehicles,
    }),
    [isLoading, vehicles]
  );

  return (
    <ApiRequestContext.Provider value={value}>
      {children}
    </ApiRequestContext.Provider>
  );
}

ApiRequestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiRequestProvider;
