import React from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ center, zoom }) => {
  return (
    <div className="weather-map-container">
      <MapContainer 
        center={center || [51.505, -0.09]} 
        zoom={zoom || 5} 
        style={{ height: '500px', width: '100%', borderRadius: '10px' }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Temperature">
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_WEATHER_API_KEY}`}
              attribution='Weather data © OpenWeatherMap'
              opacity={0.7}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Precipitation">
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_WEATHER_API_KEY}`}
              attribution='Weather data © OpenWeatherMap'
              opacity={0.7}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Clouds">
            <TileLayer
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_WEATHER_API_KEY}`}
              attribution='Weather data © OpenWeatherMap'
              opacity={0.7}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Wind Speed">
            <TileLayer
              url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_WEATHER_API_KEY}`}
              attribution='Weather data © OpenWeatherMap'
              opacity={0.7}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default WeatherMap;