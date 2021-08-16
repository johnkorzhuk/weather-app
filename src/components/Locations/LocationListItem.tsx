import { useLocationsContext } from '@/store/locations/provider';
import { SavedLocation } from '@/store/locations/state';
import { convertTemp } from '@/store/locations/utils';
import { useSettingsContext } from '@/store/settings/provider';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import _get from 'lodash/get';
import React, { useEffect, useMemo } from 'react';
import {
  useFetchWeather,
  WeatherDataDaily,
  WeatherDescription,
  WeatherReponseData,
} from '../hooks/api';
import CurrentWeatherIconGroup from '../Weather/CurrentWeatherIconGroup';
import DailyForecastChart from '../Weather/DailyForecastChart';
import HourlyForecastList from '../Weather/HourlyForecastList';

interface LocationListItemProps extends SavedLocation {}

const LocationListItem: React.FC<LocationListItemProps> = ({
  lat,
  lon,
  expanded,
  country,
  state,
  name,
  id,
  weatherData,
  dailyForecastView,
}) => {
  const classes = useStyles({ expanded, dailyForecastView });
  const theme = useTheme();
  const { actions } = useLocationsContext();
  const { state: settingsState } = useSettingsContext();
  const { data, isLoading, error } = useFetchWeather(lat, lon);
  const renderPlaceholders = Boolean(!data && isLoading) || Boolean(error);
  // const renderPlaceholders = name === 'Greenville';
  const renderDailyForecastView = dailyForecastView && !error && Boolean(data);
  const largeHourlyForecastView = expanded && !dailyForecastView;
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const convertedTemp = convertTemp(
    _get(weatherData, 'current.temp', 0),
    settingsState.tempFormat,
  );
  const currentWeatherData: WeatherDescription = _get(
    weatherData,
    'current.weather[0]',
    {},
  );
  const hourlyForecast = _get(
    weatherData,
    'hourly',
    [] as WeatherReponseData['hourly'],
  );
  const handleToggleAccordion = (
    _: React.ChangeEvent<unknown>,
    expanded: boolean,
  ) => {
    actions.updateSavedLocation(id, { expanded });
  };

  const handleToggleDailyForcastChange = (
    _: React.ChangeEvent<HTMLInputElement>,
  ) => {
    actions.updateSavedLocation(id, {
      expanded: expanded || !dailyForecastView,
      dailyForecastView: !dailyForecastView,
    });
  };

  const chartData = useMemo(() => {
    if (weatherData) {
      return weatherData.daily
        .map(({ dt, temp, weather }: WeatherDataDaily) => ({
          date: dt * 1000,
          temp: [
            convertTemp(temp.min, settingsState.tempFormat),
            convertTemp(temp.max, settingsState.tempFormat),
          ],
          weather: weather[0],
        }))
        .slice(0, 6);
    }

    return [];
  }, [weatherData]);

  useEffect(() => {
    if (data) {
      actions.updateSavedLocation(id, { weatherData: data });
    }
  }, [data]);

  return (
    <Accordion expanded={expanded} onChange={handleToggleAccordion}>
      <AccordionSummary
        id="forecast-location"
        aria-controls="forecast-location"
        classes={{
          root: classes.accordionSummaryRoot,
          content: classes.accordionSummary,
          expandIcon: classes.expandIcon,
        }}
      >
        <Box display="flex" flexDirection="column" width="100%">
          <div
            className={clsx(classes.headerContent, {
              [classes.headerContentExpanded]: largeHourlyForecastView,
            })}
          >
            <div className={classes.locationTitleContainer}>
              {renderPlaceholders ? (
                <Skeleton
                  variant="text"
                  height={34}
                  width={300}
                  style={{
                    marginTop: 2,
                  }}
                />
              ) : (
                <Typography
                  className={classes.locationTitle}
                  noWrap
                >{`${name}, ${state || country}`}</Typography>
              )}
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className={classes.switchContainer}
            >
              <FormControlLabel
                className={classes.switch}
                labelPlacement={isXs ? 'top' : 'start'}
                control={
                  <Switch
                    classes={{
                      root: classes.switchRoot,
                    }}
                    size="small"
                    checked={dailyForecastView}
                    onChange={handleToggleDailyForcastChange}
                    name="dailyForcastToggle"
                    color="primary"
                  />
                }
                label={<span className={classes.switchLabel}>5-day view</span>}
              />
            </div>
          </div>

          <Box
            display="flex"
            width="100%"
            className={clsx({
              [classes.forecastContainerPlaceholders]: renderPlaceholders,
            })}
          >
            <CurrentWeatherIconGroup
              temperature={`${convertedTemp}°`}
              description={currentWeatherData.description}
              iconCode={currentWeatherData.icon}
              large={largeHourlyForecastView}
              renderPlaceholders={renderPlaceholders}
              className={classes.nudgeUp}
            />
            {isLgUp && (
              <>
                <Collapse
                  in={largeHourlyForecastView}
                  className={clsx(classes.nudgeUp, classes.fullWidth)}
                >
                  <Box display="flex" width="100%">
                    <Box ml={1}>
                      <Divider orientation="vertical" />
                    </Box>
                    {Boolean(hourlyForecast.length || renderPlaceholders) && (
                      <HourlyForecastList
                        renderPlaceholders={renderPlaceholders}
                        forecast={hourlyForecast}
                        className={classes.dailyForecastContainer}
                      />
                    )}
                  </Box>
                </Collapse>
              </>
            )}
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails
        classes={{
          root: clsx(classes.accordionDetailsRoot),
        }}
      >
        {renderDailyForecastView ? (
          <DailyForecastChart data={chartData} />
        ) : (
          !isLgUp && (
            <HourlyForecastList
              forecast={hourlyForecast}
              renderPlaceholders={renderPlaceholders}
            />
          )
        )}
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles((theme) => ({
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(0.5),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  headerContentExpanded: {
    marginBottom: theme.spacing(2),
  },
  locationTitleContainer: {
    paddingLeft: 0,
    [theme.breakpoints.only('sm')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  locationTitle: {
    fontSize: '2.4rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
  },
  accordionSummaryRoot: {
    [theme.breakpoints.only('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  forecastContainerPlaceholders: {
    position: 'relative',
    top: 12,
    paddingBottom: ({
      expanded,
      dailyForecastView,
    }: Partial<LocationListItemProps>) =>
      theme.spacing(expanded && !dailyForecastView ? 0 : 1.5),
  },
  accordionSummary: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '&.Mui-expanded': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    display: 'flex',
    justifyContent: 'space-between',
  },
  accordionDetailsRoot: {
    padding: theme.spacing(1),
  },
  expandIcon: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing(0.75),
    marginRight: -theme.spacing(0.25),
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
    },
  },
  switchRoot: {
    alignSelf: 'flex-end',
    [theme.breakpoints.up('lg')]: {
      alignSelf: 'auto',
    },
  },
  switch: {
    marginLeft: 0,
    marginRight: 0,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  switchLabel: {
    fontSize: '1.4rem',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.6rem',
    },
  },
  nudgeUp: {
    marginTop: -theme.spacing(1),
  },
  fullWidth: {
    width: '100%',
  },
  dailyForecastContainer: {
    paddingBottom: 0,
    marginBottom: 0,
  },
}));

export default LocationListItem;
