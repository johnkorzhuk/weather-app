import { LocationData, WeatherReponseData } from '@/components/hooks/api';
import {
  createActionCreators,
  createReducerFunction,
  ImmerReducer,
} from 'immer-reducer';
import { useReducer } from 'react';
import { bindActionsCreators } from '../utils';

export interface SavedLocation extends LocationData {
  expanded: boolean;
  dailyForecastView: boolean;
  weatherData?: WeatherReponseData;
}

export interface LocationsState {
  savedLocations: {
    [id: string]: SavedLocation;
  };
}

export const INITIAL_STATE: LocationsState = {
  savedLocations: {
    'San Diego:32.7153:-117.1573:US:CA': {
      name: 'San Diego',
      lat: 32.7153,
      lon: -117.1573,
      country: 'US',
      state: 'CA',
      id: 'San Diego:32.7153:-117.1573:US:CA',
      expanded: true,
      dailyForecastView: false,
    },
    'Los Angeles:34.0522:-118.2437:US:CA': {
      name: 'Los Angeles',
      lat: 34.0522,
      lon: -118.2437,
      country: 'US',
      state: 'CA',
      id: 'Los Angeles:34.0522:-118.2437:US:CA',
      expanded: false,
      dailyForecastView: false,
    },
    'San Francisco:37.7749:-122.4194:US:CA': {
      name: 'San Francisco',
      lat: 37.7749,
      lon: -122.4194,
      country: 'US',
      state: 'CA',
      id: 'San Francisco:37.7749:-122.4194:US:CA',
      expanded: false,
      dailyForecastView: false,
    },
  },
};

export class LocationsImmerReducer extends ImmerReducer<LocationsState> {
  reset() {
    this.draftState = INITIAL_STATE;
  }

  addSavedLocation(location: LocationData) {
    this.draftState.savedLocations = {
      ...this.state.savedLocations,
      [location.id]: {
        ...location,
        expanded: true,
        dailyForecastView: false,
      },
    };
  }

  removeSavedLocation(id: string) {
    delete this.draftState.savedLocations[id];
  }

  updateSavedLocation(id: string, newLocation: Partial<SavedLocation>) {
    this.draftState.savedLocations[id] = {
      ...this.state.savedLocations[id],
      ...newLocation,
    };
  }
}

export const LocationsActionCreators = createActionCreators(
  LocationsImmerReducer,
);

const locationsReducer = createReducerFunction(LocationsImmerReducer);

export const useLocationsState = ({
  initialState = INITIAL_STATE,
  reducer = locationsReducer,
} = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
    actions: bindActionsCreators(LocationsActionCreators, dispatch),
  };
};

export default locationsReducer;
