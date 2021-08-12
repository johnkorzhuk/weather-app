import { useLocationsContext } from '@/store/locations/provider';
import { SavedLocation } from '@/store/locations/state';
import { convertTemp } from '@/store/locations/utils';
import { useSettingsContext } from '@/store/settings/provider';
import { Box, Divider } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grow from '@material-ui/core/Grow';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import React, { useEffect, useMemo, useState } from 'react';
import { useFetchWeather, WeatherDataDaily } from '../hooks/api';
import ForecastDaily from './ForecastDaily';
import ForecastHourItem from './ForecastHourItem';
import WeatherInfo from './WeatherIconInfoGroup';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
  iconInfoGroupContainer: {
    position: 'relative',
    paddingLeft: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between',
  },
  locationTitle: {
    fontSize: '2.4rem',
    fontWeight: 'bold',
    paddingLeft: theme.spacing(20),
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  locationTitleExpanded: {
    paddingLeft: theme.spacing(0),
  },
  locationContentContainerExpanded: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingTop: theme.spacing(9),
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
      paddingLeft: theme.spacing(26),
    },
  },
  divider: {
    marginTop: -theme.spacing(1.5),
    marginLeft: -theme.spacing(2),
  },
  hourlyForcastContainer: {
    width: '100%',
    margin: 0,
    display: 'flex',
    overflowY: 'auto',
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up('lg')]: {
      paddingRight: 0,
      marginTop: -theme.spacing(3),
      paddingLeft: theme.spacing(3),
    },
  },
  viewTogglecontainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  padding0: {
    padding: 0,
  },
}));

interface LocationWeatherInfoProps extends SavedLocation {}

const LocationWeatherInfo: React.FC<LocationWeatherInfoProps> = ({
  lat,
  lon,
  expanded,
  country,
  state,
  name,
  id,
  weatherData,
}) => {
  const classes = useStyles();
  const { actions } = useLocationsContext();
  const theme = useTheme();
  const { state: settingsState } = useSettingsContext();
  const [dailyForcastView, setDailyForcastView] = useState(false);
  const { data } = useFetchWeather(lat, lon);
  const { weather = [], temp } = _pick(weatherData?.current, [
    'weather',
    'temp',
  ]);
  const weatherIcon = _get(weather[0], 'icon');
  const weatherText = _get(weather[0], 'main');
  const renderDivier =
    useMediaQuery(theme.breakpoints.up('lg')) && !dailyForcastView;
  const renderCurrentReport =
    (Boolean(weatherIcon) && !dailyForcastView) ||
    (Boolean(weatherIcon) && dailyForcastView && !expanded);
  const hourslyForcastData = _get(weatherData, 'hourly', [])
    .map((data, i) => {
      if (i % 2 === 0) {
        return null;
      }
      return data;
    })
    .filter(Boolean)
    .slice(0, 10);

  const handleToggleDailyForcastChange = (
    _: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDailyForcastView(!dailyForcastView);

    if (!expanded && !dailyForcastView) {
      actions.updateSavedLocation(id, { expanded: true });
    }
  };

  // console.log(weatherData.daily);

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

  console.log(chartData);

  useEffect(() => {
    if (data) {
      actions.updateSavedLocation(id, { weatherData: data });
    }
  }, [data]);

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, expanded) => {
        actions.updateSavedLocation(id, { expanded });
      }}
    >
      <AccordionSummary
        className={clsx({
          [classes.iconInfoGroupContainer]: true,
        })}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box justifyContent="space-between" display="flex" width="100%">
          <div>
            <Typography
              className={clsx({
                [classes.locationTitle]: true,
                [classes.locationTitleExpanded]: expanded,
              })}
            >
              {`${name}, ${state || country}`}
            </Typography>
            {renderCurrentReport && (
              <WeatherInfo
                expanded={expanded}
                temp={temp}
                icon={weatherIcon}
                weatherDesc={weatherText}
              />
            )}
          </div>

          <div
            className={classes.viewTogglecontainer}
            onClick={(e) => e.stopPropagation()}
          >
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                  size="small"
                  checked={dailyForcastView}
                  onChange={handleToggleDailyForcastChange}
                  name="dailyForcastToggle"
                  color="primary"
                />
              }
              label="5-day view"
            />
          </div>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        className={clsx({
          [classes.padding0]: dailyForcastView,
        })}
      >
        {dailyForcastView ? (
          <ForecastDaily data={chartData} />
        ) : (
          <div
            className={clsx({
              [classes.locationContentContainerExpanded]: expanded,
            })}
            style={{ minHeight: expanded ? 90 : 0 }}
          >
            {renderDivier && (
              <Divider orientation="vertical" className={classes.divider} />
            )}
            <Grow in={expanded}>
              <ul className={classes.hourlyForcastContainer}>
                <>
                  {hourslyForcastData &&
                    expanded &&
                    hourslyForcastData.map(({ dt, temp, weather }) => {
                      return (
                        <li key={dt}>
                          <ForecastHourItem
                            dt={dt}
                            temp={temp}
                            icon={weather[0].icon}
                          />
                        </li>
                      );
                    })}
                </>
              </ul>
            </Grow>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default LocationWeatherInfo;
