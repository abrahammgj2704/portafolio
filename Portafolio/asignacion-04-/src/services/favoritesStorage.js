const FAVORITES_KEY = 'favoriteProductIds';

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return new Set();
    const ids = JSON.parse(raw);
    return new Set(Array.isArray(ids) ? ids : []);
  } catch (error) {
    console.warn('No se pudo leer favoritos desde LocalStorage:', error);
    return new Set();
  }
}

export function saveFavorites(favoriteIds) {
  try {
    const ids = Array.from(favoriteIds);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (error) {
    console.warn('No se pudo guardar favoritos en LocalStorage:', error);
  }
}
