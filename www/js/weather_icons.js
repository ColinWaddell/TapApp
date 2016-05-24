angular.module('app.weatherIcons', [])

.constant('WEATHER_CLOTHING', {
  "Mental": "jacket",
  "Radge": "jacket",
  "Boggin'": "jacket",
  "Dreich": "jacket",
  "Pish": "hoodie",
  "Baltic": "jacket",
  "Boggin'": "jacket",
  "Stoory": "hoodie",
  "Misty": "jacket",
  "Blowy": "jacket",
  "Awright": "tshirt",
  "Braw": "tshirt",
  "Sweltrin'": "tshirt",
  "Hackit": "jacket"
})

.constant('WEATHER_ICON', [
  "wind_lightning", // 00 - tornado
  "wind_rain", // 01 - tropical storm
  "windy", // 02 - hurricane
  "wind_lightning", // 03 - severe thunderstorms
  "wind_lightning", // 04 - thunderstorms
  "rain_snow", // 05 - mixed rain and snow
  "rain_snow", // 06 - mixed rain and sleet
  "rain_snow", // 07 - mixed snow and sleet
  "drizzle", // 08 - freezing drizzle
  "rain", // 09 - drizzle
  "drizzle", // 10 - freezing rain
  "showers", // 11 - showers
  "showers", // 12 - showers
  "wind_cloud_snow", // 13 - snow flurries
  "wind_cloud_snow", // 14 - light snow showers
  "wind_cloud_snow", // 15 - blowing snow
  "cloud_snow", // 16 - snow
  "rain_snow", // 17 - hail
  "rain_snow", // 18 - sleet
  "windy", // 19 - dust
  "fog", // 20 - foggy
  "fog", // 21 - haze
  "fog", // 22 - smoky
  "windy", // 23 - blustery
  "windy", // 24 - windy
  "temp_low", // 25 - cold
  "cloud", // 26 - cloudy
  "cloud_night", // 27 - mostly cloudy (night)
  "cloud", // 28 - mostly cloudy (day)
  "cloud_night", // 29 - partly cloudy (night)
  "cloud", // 30 - partly cloudy (day)
  "clear_night", // 31 - clear (night)
  "sun_clear", // 32 - sunny
  "clear_night", // 33 - fair (night)
  "sun_clear", // 34 - fair (day)
  "rain_snow", // 35 - mixed rain and hail
  "temp_high", // 36 - hot
  "lightning", // 37 - isolated thunderstorms
  "rain_lightning", // 38 - scattered thunderstorms
  "showers", // 39 - scattered showers
  "showers", // 40 - scattered showers
  "cloud_snow", // 41 - heavy snow
  "cloud_snow", // 42 - scattered snow showers
  "cloud_snow", // 43 - heavy snow
  "cloud", // 44 - partly cloudy
  "rain_lightning", // 45 - thundershowers
  "rain_snow", // 46 - snow showers
  "rain_lightning"  // 47 - isolated thundershowers
]);
