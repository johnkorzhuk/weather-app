import { convertTemp, convertTime } from '@/store/locations/utils';
import { useSettingsContext } from '@/store/settings/provider';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import WeatherIcon from './WeatherIcon';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    minWidth: 60,
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginRight: 0,
    },
  },
  iconContainer: {
    width: '70%',
  },
  textContainer: {
    marginTop: -theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  tempText: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    lineHeight: 1.25,
  },
  timeText: {
    fontSize: '1.6rem',
  },
}));

interface ForecastHourItemProps {
  dt: number;
  temp: number;
  icon: string;
}

const ForecastHourItem: React.FC<ForecastHourItemProps> = ({
  dt,
  temp,
  icon,
}) => {
  const classes = useStyles();
  const { state: settingsState } = useSettingsContext();
  const convertedTemp = convertTemp(temp, settingsState.tempFormat);

  return (
    <div className={classes.container}>
      <div className={classes.iconContainer}>
        <WeatherIcon iconCode={icon} />
      </div>
      <div className={classes.textContainer}>
        <span className={classes.tempText}>{convertedTemp}°</span>
        <span className={classes.timeText}>
          {convertTime(dt * 1000, settingsState.timeFormat)}
        </span>
      </div>
    </div>
  );
};

export default ForecastHourItem;
