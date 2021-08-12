import {
  createActionCreators,
  createReducerFunction,
  ImmerReducer,
} from 'immer-reducer';
import { useReducer } from 'react';
import { bindActionsCreators } from '../utils';

export enum PaletteType {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum TimeFormat {
  MIL = 'HH:mm',
  STANDARD = 'haaa',
}

export enum TempFormat {
  F = 'Fahrenheit',
  C = 'Celcius',
}

export interface SettingsState {
  timeFormat: TimeFormat;
  themeType: PaletteType | null;
  tempFormat: TempFormat;
  geolocation: boolean;
}

export const INITIAL_STATE: SettingsState = {
  timeFormat: TimeFormat.STANDARD,
  tempFormat: TempFormat.F,
  themeType: null,
  geolocation: false,
};

export class SettingsImmerReducer extends ImmerReducer<SettingsState> {
  reset() {
    this.draftState = INITIAL_STATE;
  }

  toggleThemeType(type?: PaletteType) {
    if (type) {
      this.draftState.themeType = type;
    } else {
      this.draftState.themeType =
        this.state.themeType === PaletteType.DARK
          ? PaletteType.LIGHT
          : PaletteType.DARK;
    }
  }

  toggleTimeFormatType(type?: TimeFormat) {
    if (type) {
      this.draftState.timeFormat = type;
    } else {
      this.draftState.timeFormat =
        this.state.timeFormat === TimeFormat.STANDARD
          ? TimeFormat.MIL
          : TimeFormat.STANDARD;
    }
  }

  toggleTempFormatType(type?: TempFormat) {
    if (type) {
      this.draftState.tempFormat = type;
    } else {
      this.draftState.tempFormat =
        this.state.tempFormat === TempFormat.F ? TempFormat.C : TempFormat.F;
    }
  }
}

export const SettingsActionCreators =
  createActionCreators(SettingsImmerReducer);

const settingsReducer = createReducerFunction(SettingsImmerReducer);

export const useSettingsState = ({
  initialState = INITIAL_STATE,
  reducer = settingsReducer,
} = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
    actions: bindActionsCreators(SettingsActionCreators, dispatch),
  };
};

export default settingsReducer;
