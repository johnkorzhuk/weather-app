import { convertTemp, convertTime } from '@/store/locations/utils';
import { useSettingsContext } from '@/store/settings/provider';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import _get from 'lodash/get';
import React from 'react';
import { WeatherReponseData } from '../hooks/api';
import HourlyWeatherItem from './HourlyWeatherItem';

const ITEM_COUNT = 10;

interface HourlyForecastListProps {
  forecast: WeatherReponseData['hourly'];
  className?: string;
  renderPlaceholders?: boolean;
}

const HourlyForecastList: React.FC<HourlyForecastListProps> = ({
  forecast,
  className,
  renderPlaceholders = false,
}) => {
  const classes = useStyles({ renderPlaceholders });
  const { state: settingsState } = useSettingsContext();

  const hourlyWeatherData = forecast
    .map((data, i) => {
      if (i % 2 === 0) {
        return null;
      }
      return data;
    })
    .filter(Boolean)
    .slice(0, ITEM_COUNT);

  return (
    <div className={clsx(classes.container, className)}>
      {!renderPlaceholders &&
        hourlyWeatherData.map(({ dt, temp, weather }) => {
          const convertedTemp = convertTemp(temp, settingsState.tempFormat);
          const convertedTime = convertTime(
            dt * 1000,
            settingsState.timeFormat,
          );
          const iconCode = _get(weather[0], 'icon');

          return (
            <HourlyWeatherItem
              key={dt}
              time={convertedTime}
              temperature={`${convertedTemp}°`}
              iconCode={iconCode}
            />
          );
        })}

      {renderPlaceholders &&
        Array.from({ length: ITEM_COUNT }).map((_, i) => {
          return (
            <HourlyWeatherItem
              renderPlaceholders
              key={i}
              time={0}
              temperature={`0°`}
              iconCode={'iconCode'}
            />
          );
        })}
    </div>
  );
};

export default HourlyForecastList;

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    margin: 0,
    display: 'flex',
    overflowX: ({ renderPlaceholders }: Partial<HourlyForecastListProps>) =>
      renderPlaceholders ? 'hidden' : 'auto',
    justifyContent: 'space-between',
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: theme.spacing(1),
    paddingTop: ({ renderPlaceholders }: Partial<HourlyForecastListProps>) =>
      renderPlaceholders ? theme.spacing(1) : 0,
  },
}));
