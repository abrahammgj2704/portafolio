# Plan de acción, mejoras y siguiente fase - asignacion-05

## 1. Estado actual
La asignación ya cuenta con una implementación funcional básica de una tienda de productos en React. Actualmente están presentes:
- carga de productos desde un mock local,
- búsqueda parcial por nombre,
- gestión de favoritos con persistencia en LocalStorage,
- formulario de suscripción con validación básica,
- manejo de estados de carga, error y vacío,
- ErrorBoundary para errores de renderizado.

## 2. Deuda técnica y áreas de mejora
- La lógica de carga de productos está acoplada al hook y al componente principal, lo que dificulta reutilización y prueba.
- `useFavorites()` realiza operaciones directas sobre `localStorage` sin manejo de errores más explícito ni normalización robusta de datos.
- La búsqueda y la carga de productos podrían estar mejor encapsuladas en servicios o adapters para facilitar futuras integraciones.
- El ErrorBoundary no incluye lógica de recuperación más avanzada ni logging de errores.
- El formulario de suscripción no persiste las suscripciones ni comunica con un backend real.
- No existen pruebas automatizadas, lo que limita la validación de regresiones.

## 3. Fases siguientes / roadmap
### Fase 1: robustez y estabilidad
- Mejorar el manejo de estados vacíos, errores y casos límite de datos inválidos.
- Añadir validaciones adicionales para campos de formulario y datos de entrada.
- Introducir un patrón de estado más claro para evitar lógica dispersa.

### Fase 2: experiencia de usuario
- Agregar filtros por categoría o precio.
- Mejorar los mensajes de estado con componentes más ricos.
- Implementar skeleton loaders o placeholders durante la carga.

### Fase 3: escalabilidad
- Migrar a TypeScript para mejorar la seguridad de tipos.
- Introducir un estado global más estructurado si la aplicación crece.
- Reemplazar el mock por una fuente de datos real o un backend propio.

## 4. Pruebas pendientes
Se recomienda cubrir las siguientes capas de testing:
- Pruebas unitarias para los hooks `useProducts` y `useFavorites`.
- Pruebas de integración para validar el flujo de búsqueda, favoritos y suscripción.
- Pruebas end-to-end para comprobar el comportamiento completo en el navegador.

## 5. Recomendación final
El proyecto cumple con la intención pedagógica de mostrar un caso de uso frontend relativamente simple, pero con varios puntos de mejora. La siguiente etapa debería enfocarse en elevar la robustez, separar mejor responsabilidades y preparar la aplicación para crecer sin acumular fragilidad técnica.
