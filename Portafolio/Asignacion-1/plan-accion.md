# Plan de Acción — Refactorización Estructural y Accesibilidad

Este documento detalla la estrategia secuencial para corregir los riesgos técnicos e implementar las mejoras de arquitectura, robustez visual y accesibilidad en el proyecto **Blog del Mundial**.

---

## Esquema General del Plan

El plan se estructura en 3 fases incrementales guiadas por invariantes estrictas y pruebas de caja negra automáticas/manuales para evitar regresiones de código.

```
[Paso 1: Arquitectura de Estado] ──> [Paso 2: Robustez y CSS] ──> [Paso 3: Accesibilidad y Foco]
            │                                 │                                │
            ▼                                 ▼                                ▼
  Invariante: Funcionalidad         Invariante: Identidad             Invariante: Navegación
  de filtros intacta                estética premium intacta          visual idéntica
```

---

## Paso 1: Encapsulamiento del Estado y Refactorización del DOM

### 🎯 Objetivo
Migrar todas las variables sueltas del entorno global a un contenedor único controlado de estado (*State Pattern*) y unificar la lógica de creación de tarjetas utilizando APIs nativas seguras y eficientes.

### 🛠️ Tareas Técnicas
1. **Creación del Objeto State:** Agrupar `currentFilterTag`, `currentSearchQuery`, `currentArticleId` y la nueva variable `lastFocusedCard` dentro de una constante `state`.
2. **Refactorización del Motor de Renderizado:**
   * Sustituir las plantillas de texto de tarjetas repetidas en `renderHome()` y `renderRelatedPosts()` por una función constructora centralizada llamada `createPostCard(post, isRelatedView)`.
   * Implementar `document.createElement()` en lugar de `.innerHTML` para inyectar datos de forma segura.
   * Utilizar `DocumentFragment` en los bucles de filtrado para agrupar las inserciones al DOM en una sola operación de renderizado.
3. **Sanitización Nativa:** Configurar la asignación de textos mediante `.textContent` en los campos de título, fecha y subtítulos para neutralizar cualquier vulnerabilidad de inyección de código malicioso (*Cross-Site Scripting - XSS*).

### 🔒 Invariantes
* El comportamiento dinámico de la caja de búsqueda, los clics en los botones de categorías (*chips*) y la paginación secuencial no deben sufrir ninguna alteración funcional.
* Queda prohibido declarar variables de lógica de negocio directamente en el *scope* raíz de `app.js`.

### 🧪 Pruebas Manuales de Aceptación
* **Prueba 1 (Filtros cruzados):** Escribir una palabra clave en el buscador y luego pulsar un chip de categoría. Validar que la interfaz filtre en base a la intersección exacta de ambas condiciones sin duplicar elementos.
* **Prueba 2 (Inyección Segura):** Insertar de manera temporal un elemento `<script>` dentro de un título del array de objetos en memoria. Confirmar que la tarjeta renderiza la etiqueta de forma plana como texto visible y no ejecuta ninguna ventana de alerta.

---

## Paso 2: Corrección Sintáctica, Responsividad y Sanidad Visual en CSS

### 🎯 Objetivo
Limpiar la sintaxis del archivo `style.css`, estandarizar el sistema de diseño visual (curvas y espaciados) y garantizar la estabilidad responsiva ante pantallas de anchos críticos.

### 🛠️ Tareas Técnicas
1. **Depuración de Sintaxis:** Remover la llave de cierre huérfana `}` del final de `style.css`.
2. **Abstracción por Tokens de Diseño:** Agregar variables en el bloque `:root` para unificar los radios de curvatura de contenedores, tarjetas y botones (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`).
3. **Protección Anti-Desbordamiento:** Reemplazar el ancho mínimo absoluto de las columnas del grid (`300px`) por una función matemática adaptativa: `grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr))`.
4. **Truncado Multilínea Lineal:** Aplicar las propiedades combinadas `-webkit-line-clamp: 3` y `text-overflow: ellipsis` en la clase `.card-excerpt` para evitar que descripciones extensas deformen el alineamiento de las filas.

### 🔒 Invariantes
* Se preservará intacta la paleta cromática oscura premium (`#0b0c10`, `#111422`, `#38bdf8`) del diseño base.
* Las proporciones internas de padding y márgenes de los artículos extendidos en modo lectura deben permanecer inalteradas.

### 🧪 Pruebas Manuales de Aceptación
* **Prueba 1 (Ancho Móvil Crítico):** Reducir el ancho de la ventana del navegador a `320px` empleando el emulador de dispositivos de las herramientas de desarrollo. Verificar la ausencia total de scrollbar horizontal.
* **Prueba 2 (Simetría de Grid):** Modificar un artículo en la base de datos simulada asignándole un extracto de texto que ocupe más de 6 líneas. Validar que la tarjeta corte el texto con puntos suspensivos en la tercera línea y mantenga la misma altura que el resto de las tarjetas vecinas.

---

## Paso 3: Accesibilidad Semántica (a11y) y Control de Foco del Teclado

### 🎯 Objetivo
Dotar al sitio de semántica interactiva rica para lectores de pantalla y resolver la pérdida de enfoque del teclado al conmutar entre las vistas de inicio y detalle.

### 🛠️ Tareas Técnicas
1. **Estructuración Semántica de Detalle:** Envolver el contenido extendido dentro de una etiqueta `<article>` dedicada en el archivo `index.html`.
2. **Jerarquía del Árbol de Encabezados:** Cambiar los títulos dinámicos de las tarjetas de relacionados a etiquetas `<h4>` para subordinarlos lógicamente al título principal del artículo (`<h2>`).
3. **Atributos de Estado Interactivos:** Configurar dinámicamente las propiedades `role="tab"` y `aria-selected` en los componentes de filtrado de categorías cada vez que cambie el estado de la aplicación.
4. **Restaurador de Enfoque por Teclado:** * Capturar la referencia de la tarjeta pulsada con el puntero de teclado en `state.lastFocusedCard`.
   * Implementar un disparador al ejecutar `showHome()` que devuelva el foco de manera explícita usando el método `.focus()` sobre el elemento guardado.

### 🔒 Invariantes
* El orden natural de tabulación visual del sitio no se alterará en absoluto.
* Los elementos ocultos bajo la clase `.hidden` deben quedar completamente fuera del alcance del recorrido de la tecla `Tab` del teclado.

### 🧪 Pruebas Manuales de Aceptación
* **Prueba 1 (Flujo Completo con Teclado):** Desconectar o evitar el uso del ratón. Avanzar con la tecla `Tab` hasta la cuarta tarjeta, presionar `Enter` para abrirla, navegar dentro de la vista de detalle hasta el botón "Volver al inicio" y pulsar `Enter`. Validar que el recuadro de foco regrese exactamente a la cuarta tarjeta.
* **Prueba 2 (Inspección de Atributos ARIA):** Hacer clic derecho en un chip activo y validar a través del inspector del DOM que el atributo `aria-selected` figure en estado `true`, mientras que los chips inactivos figuren en `false`.