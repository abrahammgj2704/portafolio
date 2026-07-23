# Especificación Técnica (spec.md) — Blog del Mundial

## 1. Visión General del Proyecto
El objetivo es construir una aplicación web estática de una sola página (SPA) que funcione como un Blog interactivo sobre la Copa del Mundo de Fútbol. La arquitectura se basa en estándares web modernos utilizando exclusivamente tecnologías nativas (Vanilla HTML5, CSS3 y JavaScript).

---

## 2. Requerimientos Funcionales

### Fase 1: Estructura Base y Búsqueda Reactiva
- **Maquetación Semántica**: Uso de etiquetas `header`, `main`, `section`, `article`, `nav` y `footer` para una correcta estructura y SEO.
- **Grilla de Contenidos (Home)**: Visualización de artículos en formato de tarjetas (cards) utilizando un diseño de rejilla adaptativo (`CSS Grid`).
- **Vista de Detalle**: Al hacer clic en cualquier tarjeta, la interfaz oculta dinámicamente el listado principal y renderiza el contenido extenso del artículo, incluyendo la separación automática de párrafos (`<p>`).
- **Buscador en Tiempo Real**: Un campo de entrada (`<input>`) que filtra los artículos por título de forma inmediata a medida que el usuario escribe, sin necesidad de recargar la página.

### Fase 2: Navegación y Filtros Avanzados
- **Sistema de Chips de Filtrado**: Extracción dinámica de todas las etiquetas (`tags`) únicas de los artículos para renderizar botones de filtro. Al hacer clic en un chip, el listado se reduce a esa categoría.
- **Filtrado Cruzado**: El buscador y los chips operan de forma combinada (intersección lógica).
- **Métricas de Lectura**: Cálculo dinámico en tiempo real del tiempo estimado de lectura basado en el conteo de palabras del cuerpo del texto (~200 palabras por minuto).
- **Navegación Secuencial**: Botones de "Anterior" y "Siguiente" dentro de la vista de detalle para navegar entre artículos consecutivamente. Los botones se deshabilitan automáticamente en los extremos del array de datos.
- **Artículos Relacionados**: Algoritmo que identifica y recomienda hasta 3 artículos que compartan al menos una etiqueta con el post activo actual.

---

## 3. Arquitectura de Datos e Interfaz
- **Almacenamiento Local**: Los datos están completamente contenidos en memoria mediante un Array de Objetos de JavaScript (`posts`).
- **Modelo de Datos**:
  ```typescript
  interface Post {
    id: number;
    title: string;
    subtitle: string;
    date: string; // Formato AAAA-MM-DD
    tags: string[];
    content: string; // Texto plano multilínea separado por dobles saltos de línea
  }
  ```

---

## 4. Restricciones del Sistema
- **Sin Dependencias Externas**: Prohibido el uso de frameworks de JavaScript (React, Vue, Angular) o librerías de estilos (Tailwind, Bootstrap).
- **Sin CDNs de UI**: Todo el diseño de componentes e iconos se realiza mediante CSS nativo y elementos vectoriales SVG embebidos.
- **Diseño Responsivo**: Adaptabilidad al 100% en pantallas móviles y de escritorio mediante `Media Queries` y unidades flexibles.
