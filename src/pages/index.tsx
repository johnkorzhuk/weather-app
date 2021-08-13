import PrimaryHeading from '@/components/common/PrimaryHeading';
import PlacesAutoComplete from '@/components/Input/PlacesAutoComplete';
import LocationList from '@/components/Locations/LocationList';
import { makeStyles } from '@material-ui/core/styles';
import { PageProps } from 'gatsby';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%',
    },
  },
}));

const Home: React.FC<PageProps> = () => {
  const classes = useStyles();

  return (
    <>
      <PrimaryHeading>Weather Search</PrimaryHeading>

      <div className={classes.inputContainer}>
        <PlacesAutoComplete />
      </div>

      <LocationList />
    </>
  );
};

export default Home;
