# Especificación funcional y técnica - asignacion-04

## 1. Descripción general del proyecto
La asignación 04 implementa una interfaz web sencilla en React para consultar productos desde la API pública Fake Store API y permitir al usuario marcar o desmarcar elementos como favoritos. El sistema está orientado a demostrar el uso de componentes funcionales, estado local, efectos secundarios, props de comunicación entre componentes y persistencia del estado en el navegador mediante LocalStorage.

## 2. Objetivos
- Mostrar una lista dinámica de productos obtenida desde un servicio externo.
- Permitir al usuario gestionar una colección de favoritos desde la interfaz.
- Persistir los favoritos entre recargas del navegador.
- Presentar una experiencia básica de carga, error y estado visual para el usuario.

## 3. Alcance
El proyecto incluye:
- Carga inicial de productos desde una API externa.
- Renderizado de tarjetas de producto con imagen, título y precio.
- Botón para alternar el estado de favorito por producto.
- Contador de favoritos en el encabezado.
- Persistencia de favoritos en LocalStorage.

No incluye:
- Autenticación de usuarios.
- Backend propio.
- Persistencia en base de datos.
- Funcionalidades de carrito, búsqueda avanzada o filtros.

## 4. Requisitos funcionales
1. Al iniciar la aplicación, se debe consultar la lista de productos desde la URL pública de Fake Store API.
2. La aplicación debe mostrar un mensaje de carga mientras se obtienen los datos.
3. Si la consulta falla, debe mostrarse un mensaje de error claro.
4. Cada producto debe renderizarse como una tarjeta con:
   - imagen del producto
   - título
   - precio
   - botón de favorito
5. Al hacer clic en el botón de favorito de una tarjeta, el producto debe alternar entre favorito y no favorito.
6. El contador de favoritos debe reflejar el número total de productos marcados.
7. Los favoritos deben conservarse aunque la página se recargue.

## 5. Requisitos no funcionales
- Arquitectura frontend simple y modular.
- Uso de React con Vite para desarrollo y compilación.
- Compatibilidad con navegadores modernos que soporten LocalStorage.
- Rendimiento aceptable para una lista de productos moderada.
- Código legible y organizado en componentes y servicios.

## 6. Definiciones de API e interfaces
### API externa
- Fuente: Fake Store API
- Endpoint utilizado:
  - GET https://fakestoreapi.com/products

### Estructura esperada de cada producto
```json
{
  "id": 1,
  "title": "Producto",
  "price": 29.99,
  "image": "https://..."
}
```

### Interfaces internas del frontend
- Componente App
  - Estado: favoriteIds (Set de identificadores)
  - Función: toggleFavorite(productId)
- Componente ProductList
  - Props: favoriteIds, onToggleFavorite
  - Estado interno: products, loading, error
- Componente ProductCard
  - Props: product, isFavorite, onToggleFavorite
- Servicio favoritesStorage
  - loadFavorites(): Set<number>
  - saveFavorites(favoriteIds): void

## 7. Reglas de negocio
- Un producto puede tener solo dos estados en la interfaz: favorito o no favorito.
- El estado de favorito se representa mediante un botón visual que cambia de vacío a relleno.
- El identificador del producto es la clave de negocio para determinar si un artículo pertenece al conjunto de favoritos.
- Los favoritos se almacenan como una lista de IDs en LocalStorage bajo la clave `favoriteProductIds`.
- La lógica de persistencia evita duplicados porque se trabaja con un Set en memoria.
- La UI debe reflejar el cambio de estado de forma inmediata tras la interacción del usuario.
