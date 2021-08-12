import { useLocationsState } from '@/store/locations/state';
import React, { createContext, useContext, useMemo } from 'react';

const LocationsContext = createContext(
  {} as ReturnType<typeof useLocationsState>,
);

interface LocationsProviderProps {}

const LocationsProvider: React.FC<LocationsProviderProps> = (props) => {
  const store = useLocationsState();
  const value = useMemo(() => store, [store]);

  return <LocationsContext.Provider {...props} value={value} />;
};

export const useLocationsContext = () => {
  const context = useContext(LocationsContext);

  if (!context) {
    throw new Error(
      'useLocationsContext must be used within a LocationsContextProvider',
    );
  }

  return context;
};

export default LocationsProvider;
