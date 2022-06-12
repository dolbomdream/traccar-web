import { useSelector } from 'react-redux';
import { useTranslation } from '../../common/components/LocalizationProvider';
import { useAttributePreference } from '../../common/util/preferences';

const sourceCustom = (urls) => ({
  type: 'raster',
  tiles: urls,
  tileSize: 256,
});

const sourceOpenWeather = (style, key) => sourceCustom([
  `https://tile.openweathermap.org/map/${style}/{z}/{x}/{y}.png?appid=${key}`,
]);

export default () => {
  const t = useTranslation();

  const openWeatherKey = useAttributePreference('openWeatherKey');
  const customMapOverlay = useSelector((state) => state.session.server?.overlayUrl);

  return [
    {
      id: 'openSeaMap',
      title: t('mapOpenSeaMap'),
      source: sourceCustom(['http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png']),
      available: true,
    },
    {
      id: 'openWeatherClouds',
      title: t('mapOpenWeatherClouds'),
      source: sourceOpenWeather('clouds_new', 'openWeatherKey'),
      available: !!openWeatherKey,
      attribute: 'openWeatherKey',
    },
    {
      id: 'openWeatherPrecipitation',
      title: t('mapOpenWeatherPrecipitation'),
      source: sourceOpenWeather('precipitation_new', 'openWeatherKey'),
      available: !!openWeatherKey,
      attribute: 'openWeatherKey',
    },
    {
      id: 'openWeatherPressure',
      title: t('mapOpenWeatherPressure'),
      source: sourceOpenWeather('pressure_new', 'openWeatherKey'),
      available: !!openWeatherKey,
      attribute: 'openWeatherKey',
    },
    {
      id: 'openWeatherWind',
      title: t('mapOpenWeatherWind'),
      source: sourceOpenWeather('wind_new', 'openWeatherKey'),
      available: !!openWeatherKey,
      attribute: 'openWeatherKey',
    },
    {
      id: 'openWeatherTemperature',
      title: t('mapOpenWeatherTemperature'),
      source: sourceOpenWeather('temp_new', 'openWeatherKey'),
      available: !!openWeatherKey,
      attribute: 'openWeatherKey',
    },
    {
      id: 'custom',
      title: t('mapOverlayCustom'),
      source: sourceCustom(customMapOverlay),
      available: !!customMapOverlay,
    },
  ];
};