import { format } from 'date-fns';
import { TempFormat, TimeFormat } from '../settings/state';

export const convertTemp = (kelvin: number, target: TempFormat) => {
  const celcius = kelvin - 273.15;
  const fahrenheit = (kelvin - 273.15) * 1.8 + 32;

  if (target === TempFormat.C) {
    return celcius.toFixed(1);
  }

  return fahrenheit.toFixed(1);
};

export const convertTime = (time: number, formatType: TimeFormat) => {
  return format(new Date(time), formatType);
};
