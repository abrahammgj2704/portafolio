# Arquitectura y diseño del sistema - asignacion-04

## 1. Visión general
La solución sigue un patrón de arquitectura frontend simple y modular, basada en componentes React funcionales. La separación de responsabilidades es clara:
- componentes para la presentación visual,
- un componente principal para orquestar el estado,
- un servicio dedicado para persistencia local,
- una llamada HTTP directa a un servicio externo para obtener datos.

## 2. Componentes principales
### App
Es el componente raíz de la aplicación. Su responsabilidad es:
- mantener el estado de los favoritos como un `Set`,
- cargar los favoritos desde LocalStorage al iniciar,
- exponer una función `toggleFavorite` para modificar el estado,
- pasar el estado y la función a `ProductList`.

### ProductList
Responsable de:
- realizar la solicitud a la API externa,
- gestionar los estados de carga y error,
- mapear la lista de productos a tarjetas y delegar la interacción al componente `ProductCard`.

### ProductCard
Representa la vista de cada producto. Su función es mostrar la información relevante y delegar al padre la acción de alternar favorito.

### favoritesStorage
Módulo de servicio que encapsula la interacción con `localStorage` mediante dos funciones:
- `loadFavorites()`: devuelve los IDs guardados como un `Set`.
- `saveFavorites()`: serializa el `Set` a un arreglo y lo guarda en storage.

## 3. Flujo de datos
1. Al cargar la aplicación, `App` invoca `loadFavorites()` para recuperar los favoritos almacenados.
2. `ProductList` realiza un `fetch` a la API externa y obtiene la colección de productos.
3. Cada producto se renderiza mediante `ProductCard`.
4. Cuando el usuario marca o desmarca un producto, la acción se propaga desde `ProductCard` hacia `App` mediante `onToggleFavorite`.
5. `App` actualiza el `Set` de favoritos y persiste el resultado con `saveFavorites()`.
6. El contador y la apariencia visual de cada tarjeta se actualizan en respuesta al nuevo estado.

## 4. Decisiones de diseño
- Se eligió un patrón basado en props y estado local para mantener la solución simple y alineada con los objetivos pedagógicos de la asignación.
- El uso de un `Set` en lugar de un arreglo permite evitar duplicados de forma natural y trabajar con operaciones eficientes de pertenencia.
- La persistencia en LocalStorage se implementó para que los favoritos sobrevivan al recargar la página sin necesidad de backend.
- Se separó la persistencia en un servicio independiente para aislar la lógica de acceso al almacenamiento del navegador.
- Se optó por un flujo unidireccional de datos: el estado principal vive en `App` y los componentes hijos consumen props.

## 5. Observaciones de diseño
- La aplicación no implementa un estado global más complejo como Redux o Context API, ya que el alcance del proyecto es pequeño.
- La arquitectura es adecuada para una demo o una primera iteración de una interfaz de productos, pero no está preparada para escenarios con mayor complejidad de negocio.
