import PlacesAutoComplete from '@/components/Input/PlacesAutoComplete';
import LocationList from '@/components/Locations/LocationList';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PageProps } from 'gatsby';
import React from 'react';

const useStyles = makeStyles(() => ({
  inputContainer: {
    width: '80%',
  },
}));

const Home: React.FC<PageProps> = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h1">Weather Search</Typography>

      <div className={classes.inputContainer}>
        <PlacesAutoComplete />
      </div>

      <LocationList />
    </>
  );
};

export default Home;
