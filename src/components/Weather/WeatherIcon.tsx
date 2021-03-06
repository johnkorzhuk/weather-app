import { PaletteType } from '@/store/settings/state';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import OpenWeatherIcon from 'react-open-weather-icons';

const useStyles = makeStyles((theme) => ({
  weatherIcon: {
    filter: `invert(${theme.palette.type === PaletteType.DARK ? 1 : 0})`,
    display: 'flex',
  },
}));

interface WeatherIconProps {
  iconCode: string;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
  iconCode,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <OpenWeatherIcon
      name={iconCode}
      className={clsx(classes.weatherIcon, className)}
      {...props}
    />
  );
};

export default WeatherIcon;
