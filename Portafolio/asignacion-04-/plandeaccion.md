# Plan de acción, mejoras y siguiente fase - asignacion-04

## 1. Estado actual
La asignación se encuentra en una etapa funcional básica y demostrativa. Actualmente está implementado:
- carga de productos desde Fake Store API,
- renderizado de tarjetas con datos básicos,
- alternancia de estado favorito con feedback visual,
- contador de favoritos,
- persistencia en LocalStorage,
- flujo de carga y manejo de errores básico.

## 2. Deuda técnica y áreas de mejora
- Falta de manejo de errores más granular para casos como respuestas vacías, productos sin imagen o fallos de red más específicos.
- No existe separación formal de tipos o contratos de datos; el proyecto está escrito en JavaScript puro, lo que limita la validación estática.
- La gestión del estado podría mejorar con Context API o un store si la aplicación creciera en complejidad.
- El componente `ProductList` mezcla responsabilidades de obtención de datos, manejo de estado de carga y renderizado; podría dividirse en hooks o servicios más especializados.
- No hay pruebas automatizadas implementadas, lo que dificulta la validación de regresiones.

## 3. Fases siguientes / roadmap
### Fase 1: estabilidad y calidad
- Añadir manejo más robusto de errores y estados vacíos.
- Implementar loading skeletons o placeholders para mejorar la experiencia.
- Revisar el código para aplicar mejores prácticas de React y ESLint.

### Fase 2: funcionalidad extendida
- Añadir búsqueda por nombre o categoría.
- Incorporar filtros por precio, categoría o disponibilidad.
- Permitir ordenar la lista de productos.

### Fase 3: escalabilidad
- Migrar a TypeScript para mejorar la seguridad de tipos.
- Introducir Context API o una solución de estado más robusta si crece el número de vistas y acciones.
- Considerar un backend propio para centralizar la lógica de favoritos y permitir sincronización entre dispositivos.

## 4. Pruebas pendientes
Se recomienda cubrir las siguientes capas de testing:
- Pruebas unitarias para `favoritesStorage` y la lógica de alternado de favoritos.
- Pruebas de integración para validar que `App` renderiza correctamente la lista y el contador tras modificar favoritos.
- Pruebas end-to-end para comprobar el flujo completo: cargar productos, marcar favorito, recargar la página y verificar persistencia.

## 5. Recomendación final
El proyecto ya demuestra correctamente los conceptos base de React aplicados a un caso de uso realista. La siguiente etapa debería enfocarse en mejorar la robustez, la experiencia de usuario y la cobertura de pruebas para convertir esta implementación en una solución más preparada para producción.
