import axios from 'axios';
import { useQuery } from 'react-query';

export interface LocationResponseData {
  id: string;
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
}

interface WeatherDescription {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface WeatherDataCurrent {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: Array<WeatherDescription>;
  wind_deg: number;
  wind_speed: number;
}

export interface WeatherDataHourly
  extends Omit<WeatherDataCurrent, 'sunset' | 'sunrise'> {
  pop: number;
  wind_gust: number;
}

export interface WeatherDataDaily
  extends Omit<WeatherDataCurrent, 'temp' | 'feels_like' | 'visibility'> {
  feels_like: {
    day: number;
    eve: number;
    morn: number;
    night: number;
  };
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
  wind_gust: number;
}

export interface WeatherReponseData {
  current: WeatherDataCurrent;
  daily: WeatherDataDaily[];
  timezone: string;
  timezone_offset: number;
  hourly: WeatherDataHourly[];
}

const getPlaces = async (query: string) => {
  if (!query) {
    return;
  }

  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${10}&appid=${
        process.env.GATSBY_WEATHER_API_URL
      }`,
    );

    return data.map(({ local_names: _, ...d }) => ({
      ...d,
      id: Object.values(d).join(':'),
    }));
  } catch (error) {
    throw new Error(error);
  }
};

export const usePlacesSearch = (query: string) => {
  const encodedQuery = encodeURIComponent(query);

  return useQuery<LocationResponseData[] | undefined>(query, () => {
    return getPlaces(encodedQuery);
  });
};

const getWeatherData = async (lat: number, lon: number) => {
  try {
    const { data } = await axios.get<WeatherReponseData>(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.GATSBY_WEATHER_API_URL}`,
    );

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const useFetchWeather = (lat: number, lon: number) => {
  return useQuery<WeatherReponseData>(`${lat}, ${lon}`, () => {
    return getWeatherData(lat, lon);
  });
};
