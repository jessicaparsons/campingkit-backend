const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Weather route
app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing latitude or longitude' });
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        lat,
        lon,
        appid: process.env.WEATHER_API_KEY,
        units: 'imperial'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

app.listen(PORT, () => {
  console.log(`Weather server running at http://localhost:${PORT}`);
});

