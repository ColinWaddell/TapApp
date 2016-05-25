angular.module('app.weatherIcons', [])

.constant('TEMPERATURES',[
  {title:"colder", lowerBound: -273.15},
  {title:"cold",   lowerBound:       3},
  {title:"fair",   lowerBound:      10},
  {title:"warm",   lowerBound:      16}
])

.constant('WEATHER_CLOTHING', [
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 00 - tornado
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 01 - tropical storm
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 02 - hurricane
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 03 - severe thunderstorms
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 04 - thunderstorms
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 05 - mixed rain and snow
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 06 - mixed rain and sleet
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 07 - mixed snow and sleet
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 08 - freezing drizzle
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 09 - drizzle
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 10 - freezing rain
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 11 - showers
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 12 - showers
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 13 - snow flurries
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 14 - light snow showers
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 15 - blowing snow
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 16 - snow
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 17 - hail
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 18 - sleet
  {colder:"jacket", cold:"jacket", fair:"tshirt", warm:"tshirt"}, // 19 - dust
  {colder:"hoodie", cold:"hoodie", fair:"tshirt", warm:"tshirt"}, // 20 - foggy
  {colder:"hoodie", cold:"hoodie", fair:"tshirt", warm:"tshirt"}, // 21 - haze
  {colder:"hoodie", cold:"hoodie", fair:"tshirt", warm:"tshirt"}, // 22 - smoky
  {colder:"jacket", cold:"jacket", fair:"hoodie", warm:"tshirt"}, // 23 - blustery
  {colder:"jacket", cold:"jacket", fair:"hoddie", warm:"tshirt"}, // 24 - windy
  {colder:"jacket", cold:"jacket", fair:"hoodie", warm:"hoodie"}, // 25 - cold
  {colder:"hoodie", cold:"hoodie", fair:"tshirt", warm:"tshirt"}, // 26 - cloudy
  {colder:"hoodie", cold:"hoodie", fair:"hoodie", warm:"tshirt"}, // 27 - mostly cloudy (night)
  {colder:"hoodie", cold:"hoodie", fair:"tshirt", warm:"tshirt"}, // 28 - mostly cloudy (day)
  {colder:"hoodie", cold:"hoodie", fair:"hoodie", warm:"tshirt"}, // 29 - partly cloudy (night)
  {colder:"hoodie", cold:"hoodie", fair:"tshirt", warm:"tshirt"}, // 30 - partly cloudy (day)
  {colder:"hoodie", cold:"hoodie", fair:"hoodie", warm:"tshirt"}, // 31 - clear (night)
  {colder:"tshirt", cold:"tshirt", fair:"tshirt", warm:"tshirt"}, // 32 - sunny
  {colder:"tshirt", cold:"tshirt", fair:"tshirt", warm:"tshirt"}, // 33 - fair (night)
  {colder:"tshirt", cold:"tshirt", fair:"tshirt", warm:"tshirt"}, // 34 - fair (day)
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 35 - mixed rain and hail
  {colder:"tshirt", cold:"tshirt", fair:"hoodie", warm:"tshirt"}, // 36 - hot
  {colder:"jacket", cold:"jacket", fair:"hoodie", warm:"tshirt"}, // 37 - isolated thunderstorms
  {colder:"jacket", cold:"jacket", fair:"hoodie", warm:"tshirt"}, // 38 - scattered thunderstorms
  {colder:"jacket", cold:"jacket", fair:"hoodie", warm:"tshirt"}, // 39 - scattered showers
  {colder:"jacket", cold:"jacket", fair:"hoodie", warm:"tshirt"}, // 40 - scattered showers
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 41 - heavy snow
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 42 - scattered snow showers
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 43 - heavy snow
  {colder:"hoodie", cold:"hoodie", fair:"hoodie", warm:"tshirt"}, // 44 - partly cloudy
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"tshirt"}, // 45 - thundershowers
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"hoodie"}, // 46 - snow showers
  {colder:"jacket", cold:"jacket", fair:"jacket", warm:"tshirt"}  // 47 - isolated thundershowers
])

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
  "cloud_sun", // 28 - mostly cloudy (day)
  "cloud_night", // 29 - partly cloudy (night)
  "cloud_sun", // 30 - partly cloudy (day)
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
