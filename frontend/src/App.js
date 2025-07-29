import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `htttp://weathyy.onrender.com/api/weather/forecast?city=${encodeURIComponent(city)}`  /* here is the changes of last time */
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert(`Failed to fetch weather: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWeatherIcon = (description) => {
    switch(description.toLowerCase()) {
      case 'clear sky':
        return '☀️';
      case 'rain':
      case 'light rain':
        return '🌧️';
      case 'clouds':
      case 'scattered clouds':
        return '☁️';
      case 'thunderstorm':
        return '⛈️';
      default:
        return '🌈';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="neon-title">WEATHER<span>OS</span></h1>
        
        <div className="search-container">
          <div className="search-beam"></div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="ENTER CITY NAME"
            disabled={loading}
            className="terminal-input"
          />
          <button 
            onClick={fetchWeather} 
            disabled={loading || !city.trim()}
            className="glow-button"
          >
            {loading ? (
              <>
                <span className="scanning-text">SCANNING</span>
                <span className="scanning-dots"></span>
              </>
            ) : (
              'ANALYZE'
            )}
          </button>
        </div>

        {weatherData && (
          <div className="weather-container">
            <div className="current-weather-panel">
              <h2 className="location-display">
                {weatherData.current?.name}, {weatherData.current?.country}
                <span className="signal-bars">📶📶📶</span>
              </h2>
              
              <div className="primary-data">
                <div className="temperature-display">
                  {Math.round(weatherData.current.temp)}°
                  <span className="temp-unit">C</span>
                </div>
                <div className="weather-icon-large">
                  {getWeatherIcon(weatherData.current.description)}
                </div>
              </div>

              <div className="secondary-data">
                <div className="data-row">
                  <span className="data-label">CONDITION : </span>
                  <span className="data-value">{weatherData.current.description.toUpperCase()}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">HUMIDITY : </span>
                  <span className="data-value">{weatherData.current.humidity}%</span>
                </div>
                <div className="data-row">
                  <span className="data-label">WIND SPEED : </span>
                  <span className="data-value">{weatherData.current.wind_speed} M/S</span>
                </div>
              </div>
            </div>

            <div className="forecast-section">
              <h3 className="section-title">FORECAST SEQUENCE</h3>
              
              <div className="timeline-connector"></div>
              
              <div className="forecast-scroll-wrapper">
                <div className="forecast-grid">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="forecast-card">
                      <div className="card-glow"></div>
                      <div className="day-indicator">{formatDate(day.date)}</div>
                      <div className="weather-icon-small">
                        {getWeatherIcon(day.description)}
                      </div>
                      <div className="temp-display">
                        {Math.round(day.temp)}°
                      </div>
                      <div className="weather-stats">
                        <div className="stat-item">
                          <span className="stat-icon">💧</span>
                          <span>{day.humidity}%</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-icon">🌬️</span>
                          <span>{day.wind_speed}m/s</span>
                        </div>
                      </div>
                      <div className="card-barcode"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
