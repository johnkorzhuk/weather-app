import { useLocationsContext } from '@/store/locations/provider';
import { SavedLocation } from '@/store/locations/state';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import LocationWeatherInfo from './LocationWeatherInfo';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
}));

interface LocationListProps {}

const LocationList: React.FC<LocationListProps> = () => {
  const { state } = useLocationsContext();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {Object.values(state.savedLocations)
        .reverse()
        .map(({ id, ...location }: SavedLocation) => {
          return <LocationWeatherInfo key={id} id={id} {...location} />;
        })}
    </div>
  );
};

export default LocationList;
