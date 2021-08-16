import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/format';
import _get from 'lodash/get';
import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { WeatherDataDaily } from '../hooks/api';
import WeatherIcon from '../Weather/WeatherIcon';

const useStyles = makeStyles((theme) => ({
  outer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  inner: {
    flex: 1,
    width: '100%',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      overflow: 'hidden',
    },
  },
}));

const CustomTooltip: React.FC<{
  active: boolean;
  payload: any[];
  label: string;
}> = ({ active, payload }) => {
  const classes = makeStyles((theme) => ({
    container: {
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      opacity: 0.8,
    },
    iconContainer: {
      width: 50,
      marginLeft: -theme.spacing(1),
    },
    bold: {
      fontWeight: 'bold',
    },
  }))();
  if (active && payload && payload.length) {
    const { temp, date, weather }: DailyForecastChartValue = _get(
      payload[0],
      'payload',
    );
    const [low, high] = temp;

    return (
      <Card className={classes.container}>
        <Box display="flex">
          <div className={classes.iconContainer}>
            <WeatherIcon iconCode={weather.icon} />
          </div>
          <Box display="flex" flexDirection="column" pl={1} mt={0.5}>
            <div>
              <span>High: </span>
              <span className={classes.bold}>{high}°</span>
            </div>
            <div>
              <span>Low: </span>
              <span className={classes.bold}>{low}°</span>{' '}
            </div>
          </Box>
        </Box>

        <Typography variant="h6" component="h2">
          {`${format(new Date(date), `cccc`)}`}
        </Typography>
        <Box mt={-0.5}>
          <Typography>{weather.description}</Typography>
        </Box>
      </Card>
    );
  }

  return null;
};

interface DailyForecastChartValue {
  date: number;
  temp: string[];
  weather: WeatherDataDaily['weather'][0];
}

interface DailyForecastChartProps {
  data: Array<DailyForecastChartValue>;
}

const DailyForecastChart: React.FC<DailyForecastChartProps> = ({ data }) => {
  const classes = useStyles();
  const theme = useTheme();
  // ResponsiveContainer is bugged, wont resize
  return (
    <div className={classes.outer}>
      <div className={classes.inner}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 0,
              right: 30,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => format(new Date(value), 'EEE')}
            />
            <YAxis
              padding={{
                top: 10,
                bottom: 0,
              }}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip
              // @ts-ignore
              content={<CustomTooltip />}
            />
            <Area
              dataKey="temp"
              stroke={theme.palette.primary.main}
              fill={theme.palette.primary.light}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyForecastChart;
