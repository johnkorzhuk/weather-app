import { useLocationsContext } from '@/store/locations/provider';
import { SavedLocation } from '@/store/locations/state';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
// import LocationWeatherInfo from './OldLocationWeatherInfo';
import LocationListItem from './LocationListItem';

interface LocationListProps {}

const LocationList: React.FC<LocationListProps> = () => {
  const { state } = useLocationsContext();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {Object.values<SavedLocation>(state.savedLocations)
        .reverse()
        .map((location) => {
          return <LocationListItem key={location.id} {...location} />;
        })}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
}));

export default LocationList;
