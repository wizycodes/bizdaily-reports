const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const BASE_URL = `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=20&apiKey=${API_KEY}`;

export async function fetchBusinessNews() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch business news');
  }
  const data = await response.json();
  return data.articles;
}
