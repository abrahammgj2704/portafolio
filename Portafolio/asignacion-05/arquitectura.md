# Arquitectura y diseño del sistema - asignacion-05

## 1. Visión general
La solución sigue un patrón de arquitectura frontend simple basado en componentes funcionales y hooks personalizados en React. El diseño separa la lógica de negocio en capas leves:
- componentes de presentación,
- hooks para acceso a estado y efectos,
- constantes y datos mock,
- un ErrorBoundary para capturar excepciones de renderizado.

## 2. Componentes principales
### App
Es el componente orquestador principal. Coordina:
- carga de productos con `useProducts()`,
- manejo de favoritos con `useFavorites()`,
- estado de búsqueda local,
- renderizado condicional de estados de carga, error y vacío.

### Hooks personalizados
- `useProducts()`: encapsula la carga de productos con un retraso artificial de 800 ms y el manejo de estados.
- `useFavorites()`: administra los favoritos en memoria y los sincroniza con LocalStorage.

### Componentes UI
- `ProductCard`: muestra cada producto y permite alternar favorito.
- `SubscribeForm`: gestiona el formulario de suscripción con validación de email.
- `ErrorBoundary`: captura errores de renderizado y evita que la UI completa se rompa.

### Datos y constantes
- `mockProducts.js`: catálogo estático usado como fuente de datos.
- `constants.js`: centraliza la imagen de respaldo y el regex de validación del email.

## 3. Flujo de datos
1. Al montar la aplicación, `App` solicita productos a través de `useProducts()`.
2. `useProducts()` simula la carga con un `setTimeout` y luego actualiza el estado con los mock products.
3. El usuario puede escribir texto en el buscador; `App` filtra los productos con `useMemo` y los muestra en la grilla.
4. Al marcar un producto como favorito, `ProductCard` invoca `toggleFavorite(id)`.
5. `useFavorites()` actualiza el estado local y guarda los cambios en LocalStorage.
6. El formulario de suscripción valida el correo y, si es correcto, cambia a un estado de éxito.

## 4. Decisiones de diseño
- Se eligió una arquitectura muy simple y didáctica para facilitar la auditoría del código y la identificación de fallas técnicas.
- La separación entre `App`, hooks y componentes permite localizar responsabilidades específicas, aunque algunas están acopladas de forma frágil.
- Se optó por LocalStorage para almacenar favoritos porque es una solución ligera y sin backend.
- El uso de `ErrorBoundary` demuestra una estrategia de resiliencia para errores de renderizado, aunque su implementación es limitada.
- El mock de productos se utiliza deliberadamente para poder probar el comportamiento de la UI sin depender de servicios externos.

## 5. Observaciones arquitectónicas
El proyecto está bien orientado para enseñar problemas comunes como:
- manejo incompleto de estados,
- lógica mezclada en componentes,
- falta de robustez ante datos inválidos,
- acoplamiento excesivo entre visualización y persistencia.
