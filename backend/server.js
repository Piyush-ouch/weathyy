require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/weather/forecast', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ message: 'City parameter is required' });
    }

    try {
        // First get current weather
        const currentResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );

        // Then get forecast (5 day / 3 hour forecast)
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );

        // Process current weather data
        const currentWeather = {
            name: currentResponse.data.name,
            country: currentResponse.data.sys.country,
            temp: currentResponse.data.main.temp,
            description: currentResponse.data.weather[0].description,
            humidity: currentResponse.data.main.humidity,
            wind_speed: currentResponse.data.wind.speed,
            coord: {
                lat: currentResponse.data.coord.lat,
                lon: currentResponse.data.coord.lon
            }
        };

        // Process forecast data - we'll take one reading per day (at noon)
        const forecastData = forecastResponse.data.list.filter(item => {
            return item.dt_txt.includes('12:00:00');
        }).slice(0, 7).map(item => ({
            date: item.dt_txt,
            temp: item.main.temp,
            description: item.weather[0].description,
            humidity: item.main.humidity,
            wind_speed: item.wind.speed
        }));

        res.json({
            current: currentWeather,
            forecast: forecastData
        });

    } catch (error) {
        console.error('Error fetching data from OpenWeather API:', error);
        if (error.response) {
            // OpenWeather API returned an error
            res.status(error.response.status).json({ 
                message: 'Error fetching weather data', 
                error: error.response.data.message 
            });
        } else {
            // Other errors (network, etc.)
            res.status(500).json({ 
                message: 'Error fetching weather data', 
                error: error.message 
            });
        }
    }
});

app.get('/', (req, res) => {
    res.send('Weather backend API is running!');
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});