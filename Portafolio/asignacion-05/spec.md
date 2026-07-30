# Especificación funcional y técnica - asignacion-05

## 1. Descripción del proyecto
La asignación 05 implementa una tienda de productos en React con Vite cuyo propósito es demostrar un flujo completo de interfaz de usuario con carga de datos simulados, búsqueda, gestión de favoritos y suscripción por correo electrónico. El proyecto está diseñado como una aplicación de auditoría, donde se identifican fallas intencionales y se proponen mejoras de robustez, experiencia de usuario y arquitectura.

## 2. Objetivos
- Mostrar una lista de productos en una interfaz visual sencilla.
- Permitir al usuario buscar productos por nombre.
- Permitir marcar o desmarcar productos como favoritos.
- Gestionar un formulario de suscripción con validación de correo.
- Exponer estados de carga, error y vacío de forma clara.
- Demostrar fragilidades de implementación que deben corregirse en una versión más robusta.

## 3. Alcance
El proyecto incluye:
- Carga inicial de productos desde un mock local.
- Búsqueda reactiva en tiempo real.
- Persistencia de favoritos en LocalStorage.
- Componente de error boundary para capturar fallos de renderizado.
- Formulario de suscripción con validación de email.

No incluye:
- Backend propio.
- Autenticación de usuarios.
- Integración real con un servicio externo.
- Gestión de carrito, pagos o inventario.

## 4. Requisitos funcionales
1. La aplicación debe cargar una lista inicial de productos al renderizarse.
2. El usuario debe poder buscar productos por nombre mediante un campo de texto.
3. La interfaz debe mostrar un estado de carga durante la demora artificial de 800 ms.
4. Si no hay productos disponibles o si no existen coincidencias, debe mostrarse un mensaje de estado apropiado.
5. El usuario debe poder alternar el estado de favorito de cada producto.
6. Los favoritos deben persistirse en LocalStorage.
7. El formulario de suscripción debe validar el formato del correo y mostrar mensajes de éxito o error.
8. La aplicación debe capturar errores de renderizado en un ErrorBoundary.

## 5. Requisitos no funcionales
- Implementación frontend sencilla con React y Vite.
- Compatibilidad con navegadores modernos.
- Uso de LocalStorage para persistencia ligera.
- Diseño orientado a la demostración y auditoría del código, no a una solución de producción completa.
- Código modular por componentes y hooks, aunque con puntos de fragilidad intencional.

## 6. Definiciones de API / Interfaces
No hay API externa. El proyecto consume datos locales a través de un mock:
- Archivo: `src/mockProducts.js`
- Estructura de producto:

```js
{
  id: 1,
  name: 'Laptop Pro',
  price: 1299.99,
  image: 'https://...',
  category: 'electronics'
}
```

### Interfaces internas del sistema
- `useProducts()`: devuelve `products`, `isLoading`, `error` y `loadProducts()`.
- `useFavorites()`: devuelve `favorites` y `toggleFavorite(id)`.
- `ProductCard`: recibe `product`, `isFavorite` y `onToggleFavorite`.
- `SubscribeForm`: gestiona `email`, `emailError`, `subscribed` y el submit.

## 7. Reglas de negocio
- La búsqueda se realiza por coincidencia parcial del nombre del producto en minúsculas.
- Un producto puede estar o no en favoritos.
- El estado de favorito se representa visualmente mediante un botón con estilo activo o inactivo.
- El formulario de suscripción solo acepta un formato de correo válido.
- Si la URL de imagen está vacía, nula o inválida, se muestra una imagen de respaldo.
- Si ocurre un error durante la renderización de la app, el ErrorBoundary muestra un mensaje de recuperación.
