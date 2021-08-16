import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import React from 'react';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherIconGroupProps {
  temperature: number | string;
  description: string;
  iconCode: string;
  large?: boolean;
  renderPlaceholders?: boolean;
  className?: string;
}

const CurrentWeatherIconGroup: React.FC<CurrentWeatherIconGroupProps> = ({
  temperature,
  description,
  large = false,
  renderPlaceholders = false,
  iconCode,
  className,
}) => {
  const classes = useStyles({ large });

  return (
    <div
      className={clsx(classes.container, className, {
        [classes.containerPlaceholder]: renderPlaceholders,
      })}
    >
      <div className={classes.iconContainer}>
        {renderPlaceholders ? (
          <Skeleton
            className={clsx(classes.placeholder, classes.iconPlaceholder)}
            variant="circle"
            height={large ? 60 : 40}
            width={large ? 60 : 40}
            style={{
              top: -2,
            }}
          />
        ) : (
          <WeatherIcon iconCode={iconCode} />
        )}
      </div>

      <div className={classes.dataContainer}>
        <Collapse in={large}>
          <Typography noWrap className={classes.tertiaryItem}>
            {renderPlaceholders ? (
              <Skeleton
                variant="text"
                height={18}
                width={22}
                className={classes.placeholder}
              />
            ) : (
              'now'
            )}
          </Typography>
        </Collapse>
        <Typography className={classes.primaryItem}>
          {renderPlaceholders ? (
            <Skeleton
              variant="text"
              height={30}
              width={80}
              className={classes.placeholder}
              style={{
                bottom: 4,
              }}
            />
          ) : (
            temperature
          )}
        </Typography>
        <Typography noWrap className={classes.secondaryItem}>
          {renderPlaceholders ? (
            <Skeleton
              variant="text"
              height={16}
              width={100}
              className={classes.placeholder}
            />
          ) : (
            description
          )}
        </Typography>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    fontSize: ({ large }: Partial<CurrentWeatherIconGroupProps>) =>
      large ? '2rem' : '1.5rem',
    transition: theme.transitions.create('font-size', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  containerPlaceholder: {
    minWidth: 200,
    marginTop: theme.spacing(-2),
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(-1),
      minWidth: 140,
    },
  },
  iconPlaceholder: {
    right: theme.spacing(-1),
    [theme.breakpoints.up('lg')]: {
      right: 0,
    },
  },
  iconContainer: {
    width: ({ large }: Partial<CurrentWeatherIconGroupProps>) =>
      theme.spacing(large ? 10 : 6.5),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  dataContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(1),
    },
    [theme.breakpoints.up('lg')]: {
      width: 140,
    },
  },
  primaryItem: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    lineHeight: 0.9,
  },
  secondaryItem: {
    fontSize: '0.8em',
  },
  tertiaryItem: {
    fontSize: '0.8em',
  },
  placeholder: {
    position: 'relative',
    top: -theme.spacing(0.5),
  },
}));

export default CurrentWeatherIconGroup;
