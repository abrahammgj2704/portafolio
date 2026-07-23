import { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import { loadFavorites, saveFavorites } from './services/favoritesStorage';

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  useEffect(() => {
    setFavoriteIds(loadFavorites());
  }, []);

  const toggleFavorite = (productId) => {
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      saveFavorites(next);
      return next;
    });
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <h1>Fake Store API</h1>
          <p className="favorite-counter">Favoritos: {favoriteIds.size}</p>
        </div>
      </header>
      <ProductList favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
    </main>
  );
}
