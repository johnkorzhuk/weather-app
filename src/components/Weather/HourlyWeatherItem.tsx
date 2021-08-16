import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import React from 'react';
import WeatherIcon from './WeatherIcon';

interface HourlyWeatherItemProps {
  time: number | string;
  temperature: number | string;
  iconCode: string;
  renderPlaceholders?: boolean;
}

const HourlyWeatherItem: React.FC<HourlyWeatherItemProps> = ({
  time,
  temperature,
  iconCode,
  renderPlaceholders = false,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.container)}>
      <div className={classes.iconContainer}>
        {renderPlaceholders ? (
          <Box mb={0.75} ml={0.5}>
            <Skeleton variant="circle" height={28} width={28} />
          </Box>
        ) : (
          <WeatherIcon iconCode={iconCode} />
        )}
      </div>
      <div className={classes.textContainer}>
        <span className={classes.tempText}>
          {renderPlaceholders ? (
            <Skeleton variant="text" height={26} width={40} />
          ) : (
            temperature
          )}
        </span>
        <span className={classes.timeText}>
          {renderPlaceholders ? (
            <Box mt={-0.5}>
              <Skeleton variant="text" height={18} width={30} />
            </Box>
          ) : (
            time
          )}
        </span>
      </div>
    </div>
  );
};

export default HourlyWeatherItem;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    minWidth: 60,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    overflowY: 'hidden',
    '&:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.up('md')]: {
      marginRight: 0,
    },
  },

  iconContainer: {
    width: '80%',
    maxWidth: 40,
    marginLeft: -theme.spacing(1),
  },
  textContainer: {
    marginTop: -theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'column',
  },
  tempText: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: '1.5rem',
    lineHeight: 0.8,
  },
}));
