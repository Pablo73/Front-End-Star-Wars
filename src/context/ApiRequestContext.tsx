import { createContext } from 'react';
import { Vehicle } from '../type';

interface ApiRequestContextProps {
  vehicles: Vehicle[];
  isLoading: boolean;
}

const ApiRequestContext = createContext<ApiRequestContextProps | undefined>(undefined);

export default ApiRequestContext;
