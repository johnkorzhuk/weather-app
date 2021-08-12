import { convertTemp } from '@/store/locations/utils';
import { useSettingsContext } from '@/store/settings/provider';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import WeatherIcon from './WeatherIcon';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: 80,
    top: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      top: '55%',
    },
  },
  collapsed: {
    transform: 'translateY(-50%)',
    top: '52%',
  },
  expanded: {
    top: theme.spacing(9),
    left: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      transform: 'translateY(26px)',
      top: theme.spacing(7),
    },
  },
  icon: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  iconCollapsed: {
    width: '70%',
  },
  iconExpanded: {
    width: '100%',
  },
  iconText: {
    position: 'absolute',
    transition: theme.transitions.create('fontSize', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  infoContainer: {
    position: 'absolute',
    right: -theme.spacing(2),
    top: -theme.spacing(1.75),
  },
  tempTextCollapased: {
    left: theme.spacing(7.5),
    top: 8,
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  tempTextExpanded: {
    top: theme.spacing(2.5),
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  weatherIconDescCollapsed: {
    bottom: 8,
    left: theme.spacing(7.5),
    fontSize: '1.5rem',
  },
  weatherIconDescExpanded: {
    fontSize: '1.6rem',
    top: theme.spacing(7),
  },
  dateText: {
    top: 0,
    fontSize: '2rem',
  },
  dateTextCollpased: {
    display: 'none',
  },
}));

interface WeatherInfoProps {
  icon: string;
  temp: number;
  expanded: boolean;
  weatherDesc: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  expanded,
  temp,
  icon,
  weatherDesc,
}) => {
  const classes = useStyles();
  const { state: settingsState } = useSettingsContext();
  const convertedTemp = convertTemp(temp, settingsState.tempFormat);

  return (
    <div
      className={clsx({
        [classes.container]: true,
        [classes.collapsed]: !expanded,
        [classes.expanded]: expanded,
      })}
    >
      <WeatherIcon
        iconCode={icon}
        className={clsx({
          [classes.icon]: true,
          [classes.iconCollapsed]: !expanded,
          [classes.iconExpanded]: expanded,
        })}
      />
      <div
        className={clsx({
          [classes.infoContainer]: expanded,
        })}
      >
        {/* <span
          className={clsx({
            [classes.dateTextCollpased]: !expanded,
            [classes.dateText]: true,
            [classes.iconText]: true,
          })}
        >
          now
        </span> */}
        <span
          className={clsx({
            [classes.iconText]: true,
            [classes.tempTextCollapased]: !expanded,
            [classes.tempTextExpanded]: expanded,
          })}
        >
          {convertedTemp}°
        </span>
        <span
          className={clsx({
            [classes.iconText]: true,
            [classes.weatherIconDescCollapsed]: !expanded,
            [classes.weatherIconDescExpanded]: expanded,
          })}
        >
          {weatherDesc.toLowerCase()}
        </span>
      </div>
    </div>
  );
};

export default WeatherInfo;
