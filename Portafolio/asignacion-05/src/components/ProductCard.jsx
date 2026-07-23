import { memo, useState } from 'react'
import { FALLBACK_IMAGE } from '../constants'

export const ProductCard = memo(function ProductCard({ product, isFavorite, onToggleFavorite }) {
  const [imgFailed, setImgFailed] = useState(false)

  const imageSrc = imgFailed || !product.image || !String(product.image).trim()
    ? FALLBACK_IMAGE
    : product.image

  return (
    <div className="product-card">
      <img
        src={imageSrc}
        alt={product.name}
        loading="lazy"
        onError={() => setImgFailed(true)}
      />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <button
        className={isFavorite ? 'btn-fav active' : 'btn-fav'}
        onClick={() => onToggleFavorite(product.id)}
        aria-label={isFavorite ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
        aria-pressed={isFavorite}
      >
        {isFavorite ? '\u2605 Favorito' : '\u2606 Favorito'}
      </button>
    </div>
  )
})
