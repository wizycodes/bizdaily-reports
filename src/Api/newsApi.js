// src/newsApi.js (rewritten for GNews)
const API_KEY = process.env.REACT_APP_NEWS_API_KEY; // or use process.env if preferred

const BASE_URL = `https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=us&max=100&apikey=${API_KEY}`;

export async function fetchBusinessNews() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch business news');
  }
  const data = await response.json();
  return data.articles;
}
