// src/ArticleContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const ArticleContext = createContext();

export const useArticle = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
  const [selectedArticle, setSelectedArticle] = useState(() => {
    const saved = localStorage.getItem('selectedArticle');
    return saved ? JSON.parse(saved) : null;
  });

  const [relatedArticles, setRelatedArticles] = useState(() => {
    const saved = localStorage.getItem('relatedArticles');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedArticle', JSON.stringify(selectedArticle));
    localStorage.setItem('relatedArticles', JSON.stringify(relatedArticles));
  }, [selectedArticle, relatedArticles]);

  return (
    <ArticleContext.Provider
      value={{ selectedArticle, setSelectedArticle, relatedArticles, setRelatedArticles }}
    >
      {children}
    </ArticleContext.Provider>
  );
};
