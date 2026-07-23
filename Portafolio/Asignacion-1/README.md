# 🏆 MundialBlog — Vanilla Web Project

Aplicación interactiva y responsiva sobre la Copa del Mundo de Fútbol. Este proyecto ha sido desarrollado como una **Single Page Application (SPA)** autocontenida utilizando estrictamente estándares web nativos, cumpliendo con los objetivos y fases de desarrollo técnico especificados en los briefs de la asignatura.

---

## 🚀 Características del Proyecto

### Fase 1: Núcleo e Interacción Base
* **Diseño Semántico Limpio**: Construcción estructurada utilizando HTML5 semántico (`<header>`, `<main>`, `<article>`, `<nav>`).
* **Buscador Reactivo**: Filtrado en tiempo real que procesa los títulos de las entradas a medida que el usuario escribe en el input de búsqueda.
* **Vista Dinámica de Detalle**: Transición fluida de la grilla principal a la lectura completa de un artículo sin recargar el navegador.

### Fase 2: Lógica Avanzada y Navegación Secuencial
* **Botonera de Tags Dinámica**: Extracción automática de las etiquetas únicas de los artículos en memoria para generar píldoras (`chips`) de filtrado interactivo.
* **Algoritmo de Tiempo de Lectura**: Cálculo dinámico basado en una métrica estándar de lectura (~200 palabras por minuto) inyectado directamente en los metadatos de las tarjetas.
* **Paginación Secuencial**: Navegación directa ("Anterior" / "Siguiente") dentro del post activo con bloqueo automático en los extremos del arreglo.
* **Sistema de Artículos Relacionados**: Motor de recomendación inteligente que analiza el artículo actual y despliega de forma cruzada hasta 3 recomendaciones que compartan alguna categoría técnica.

---

## 🛠️ Tecnologías Utilizadas

Para garantizar un código limpio, optimizado y sin sobrecarga de dependencias, no se utilizaron frameworks ni librerías de terceros:

* **HTML5** (Estructura semántica de datos)
* **CSS3 Nativo** (Variables `:root`, Flexbox, CSS Grid y Animaciones fluidas por fotogramas)
* **Vanilla JavaScript (ES6+)** (Manipulación del DOM, control de estado local y algoritmos de filtrado)

---

## 📦 Estructura de Archivos

De acuerdo con las instrucciones de empaquetado optimizado, el código fuente se unificó en un único archivo raíz para simplificar su distribución y despliegue local:

```bash
.
├── index.html        # Estructura HTML, Estilos CSS y Lógica JS (unificados)
├── spec.md           # Especificación técnica formal del sistema
└── README.md         # Documentación general y guía de ejecución (este archivo)