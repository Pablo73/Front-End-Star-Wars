import { makeObservable, observable, action } from 'mobx';
import { Vehicle } from '../type';

class VehicleStore {
  vehicles: Vehicle[] = [];
  isLoading = false;
  static vehicles: any;
  static isLoading: any;

  constructor() {
    makeObservable(this, {
      vehicles: observable,
      isLoading: observable,
      setVehicles: action,
      setIsLoading: action,
    });
  }

  setVehicles(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}

export default VehicleStore;
