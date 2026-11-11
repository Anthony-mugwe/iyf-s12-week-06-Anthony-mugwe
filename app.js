'use strict';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const HISTORY_KEY = 'weatherDashboardRecentCities';
const MAX_HISTORY = 5;

const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const statusMessage = document.getElementById('status-message');
const weatherDisplay = document.getElementById('weather-display');
const historyList = document.getElementById('search-history');
const clearHistoryButton = document.getElementById('clear-history');

const elements = {
  city: document.getElementById('city-name'),
  date: document.getElementById('weather-date'),
  icon: document.getElementById('weather-icon'),
  temperature: document.getElementById('temperature'),
  description: document.getElementById('description'),
  feelsLike: document.getElementById('feels-like'),
  humidity: document.getElementById('humidity'),
  wind: document.getElementById('wind'),
  pressure: document.getElementById('pressure')
};

function getApiKey() {
  const key = window.WEATHER_CONFIG && window.WEATHER_CONFIG.API_KEY;
  if (!key || key === 'PASTE_YOUR_OPENWEATHERMAP_KEY_HERE') {
    throw new Error('API key is missing. Add your key to config.js, then refresh the page.');
  }
  return key;
}

function setStatus(message = '', isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle('error', isError);
}

function setLoading(isLoading) {
  searchButton.disabled = isLoading;
  searchButton.textContent = isLoading ? 'Loading…' : 'Search →';
  if (isLoading) {
    weatherDisplay.classList.add('hidden');
    setStatus('Loading…');
  }
}

function displayWeather(data) {
  const condition = data.weather[0];
  elements.city.textContent = `${data.name}, ${data.sys.country}`;
  elements.date.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(new Date());
  elements.temperature.textContent = `${Math.round(data.main.temp)}°C`;
  elements.description.textContent = condition.description;
  elements.icon.src = `https://openweathermap.org/img/wn/${condition.icon}@4x.png`;
  elements.icon.alt = condition.description;
  elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  elements.humidity.textContent = `${data.main.humidity}%`;
  elements.wind.textContent = `${data.wind.speed} m/s`;
  elements.pressure.textContent = `${data.main.pressure} hPa`;
  weatherDisplay.classList.remove('hidden');
}

function getHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(city => typeof city === 'string') : [];
  } catch (error) {
    console.warn('Could not read recent searches:', error);
    return [];
  }
}

function saveToHistory(city) {
  const normalizedCity = city.trim();
  const updated = [
    normalizedCity,
    ...getHistory().filter(item => item.toLowerCase() !== normalizedCity.toLowerCase())
  ].slice(0, MAX_HISTORY);

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Could not save recent searches:', error);
  }
  renderHistory();
}

function renderHistory() {
  const cities = getHistory();
  historyList.replaceChildren();

  if (cities.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-history';
    emptyItem.textContent = 'Your searched cities will appear here.';
    historyList.append(emptyItem);
    return;
  }

  cities.forEach(city => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = city;
    button.addEventListener('click', () => {
      cityInput.value = city;
      searchWeather(city);
    });
    item.append(button);
    historyList.append(item);
  });
}

async function searchWeather(city) {
  const cleanCity = city.trim();
  if (!cleanCity) {
    setStatus('Please enter a city name.', true);
    return;
  }

  setLoading(true);

  try {
    const apiKey = getApiKey();
    const url = `${BASE_URL}?q=${encodeURIComponent(cleanCity)}&appid=${encodeURIComponent(apiKey)}&units=metric`;
    const response = await fetch(url);

    // fetch() only rejects for network-level failures; a 404 must be checked explicitly.
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`We couldn't find "${cleanCity}". Check the spelling and try again.`);
      }
      if (response.status === 401) {
        throw new Error('The API key is not active or is incorrect. New keys can take up to 2 hours to activate.');
      }
      throw new Error(`Weather service error (${response.status}). Please try again later.`);
    }

    const data = await response.json();
    displayWeather(data);
    saveToHistory(data.name);
    setStatus(`Weather updated for ${data.name}.`);
  } catch (error) {
    console.error('Weather request failed:', error);
    weatherDisplay.classList.add('hidden');
    if (error instanceof TypeError) {
      setStatus('No internet connection. Check your connection and try again.', true);
    } else {
      setStatus(error.message || 'Something went wrong. Please try again.', true);
    }
  } finally {
    setLoading(false);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  searchWeather(cityInput.value);
});

clearHistoryButton.addEventListener('click', () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
  setStatus('Recent searches cleared.');
});

renderHistory();
