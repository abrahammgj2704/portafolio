import { useState, useMemo } from 'react'
import { useProducts } from './hooks/useProducts'
import { useFavorites } from './hooks/useFavorites'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ProductCard } from './components/ProductCard'
import { SubscribeForm } from './components/SubscribeForm'

export default function App() {
  const { products, isLoading, error, loadProducts } = useProducts()
  const { favorites, toggleFavorite } = useFavorites()
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () => products.filter(p =>
      p.name.toLowerCase().includes(search.trim().toLowerCase())
    ),
    [products, search]
  )

  return (
    <ErrorBoundary>
      <div className="app">
        <header className="app-header">
          <h1>{'\uD83D\uDED2'} Tienda</h1>
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Buscar productos"
          />
        </header>

        <main>
          {error ? (
            <div className="state-message error-state" role="alert">
              <p>{error}</p>
              <button onClick={loadProducts}>Reintentar</button>
            </div>
          ) : isLoading ? (
            <div className="state-message loading-state" role="status" aria-busy="true">
              Cargando productos...
            </div>
          ) : filtered.length === 0 ? (
            <div className="state-message empty-state" role="status">
              {products.length === 0
                ? 'No hay productos disponibles.'
                : 'No se encontraron productos.'}
            </div>
          ) : (
            <div className="product-grid" role="list" aria-label="Lista de productos">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}

          <SubscribeForm />
        </main>
      </div>
    </ErrorBoundary>
  )
}
