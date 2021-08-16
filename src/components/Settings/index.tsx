import { convertTime } from '@/store/locations/utils';
import { useSettingsContext } from '@/store/settings/provider';
import { PaletteType, TempFormat, TimeFormat } from '@/store/settings/state';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from 'react';

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const { state, actions } = useSettingsContext();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControlLabel
        labelPlacement="start"
        classes={{
          root: classes.switch,
        }}
        control={
          <ToggleButtonGroup
            size="small"
            value={state.timeFormat}
            exclusive
            color="primary"
            onChange={(_, newValue) => actions.toggleTimeFormatType(newValue)}
            aria-label="text alignment"
          >
            <ToggleButton
              className={classes.minWidthButton}
              value={TimeFormat.STANDARD}
              aria-label="standard"
            >
              {convertTime(Date.now(), TimeFormat.STANDARD)}
            </ToggleButton>

            <ToggleButton
              className={classes.minWidthButton}
              value={TimeFormat.MIL}
              aria-label="military"
            >
              {convertTime(Date.now(), TimeFormat.MIL)}
            </ToggleButton>
          </ToggleButtonGroup>
        }
        label="Time format"
      />

      <FormControlLabel
        labelPlacement="start"
        classes={{
          root: classes.switch,
        }}
        control={
          <ToggleButtonGroup
            size="small"
            value={state.tempFormat}
            exclusive
            color="primary"
            onChange={(_, newValue) => actions.toggleTempFormatType(newValue)}
            aria-label="text alignment"
          >
            <ToggleButton
              className={classes.minWidthButton}
              value={TempFormat.F}
              aria-label="fahrenheit"
            >
              f°
            </ToggleButton>

            <ToggleButton
              className={classes.minWidthButton}
              value={TempFormat.C}
              aria-label="celcius"
            >
              c°
            </ToggleButton>
          </ToggleButtonGroup>
        }
        label="Temperature format"
      />

      <FormControlLabel
        labelPlacement="start"
        classes={{
          root: classes.switch,
        }}
        control={
          <Switch
            checked={state.themeType === PaletteType.DARK}
            onChange={() => actions.toggleThemeType()}
            size="small"
            name="themeToggle"
            color="primary"
          />
        }
        label="Dark mode"
      />

      <FormControlLabel
        labelPlacement="start"
        classes={{
          root: classes.switch,
        }}
        control={<Switch size="small" name="geoLocateToggle" color="primary" />}
        label="Geolocation"
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 320,
  },
  switch: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 0,
    marginTop: theme.spacing(3),
  },
  minWidthButton: {
    minWidth: 48,
  },
}));

export default Settings;
