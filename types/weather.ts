export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherInfo[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  snow?: {
    "1h"?: number;
    "3h"?: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
    type?: number;
    id?: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}
