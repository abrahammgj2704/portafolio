export default function ProductCard({ product, isFavorite, onToggleFavorite }) {
  const { id, title, price, image } = product;

  return (
    <article className="product-card">
      <button
        type="button"
        className={`favorite-button ${isFavorite ? 'favorite-button--active' : ''}`}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        onClick={() => onToggleFavorite(id)}
      >
        {isFavorite ? '★' : '☆'}
      </button>
      <img src={image} alt={title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price}</p>
      </div>
    </article>
  );
}
