# Reporte de Mejoras Estructurales — Blog del Mundial

**Fecha:** 2026-05-19  
**Autor:** Estudiante de Programación  
**Tecnologías:** HTML5 Semántico, CSS3 Custom Properties, JavaScript Vanilla (ES6+)

---

## 1. Arquitectura de Software y Gestión de Estado (`app.js`)

### Estado Global Encapsulado
* **Antes:** Las variables de control de la aplicación (`currentFilterTag`, `currentSearchQuery`, `currentArticleId`) se encontraban dispersas de forma suelta en el entorno global del script, quedando expuestas a colisiones de nombres o manipulaciones externas accidentales.
* **Después:** Se unificaron bajo un único objeto de estado centralizado denominado `state`. Toda lectura y mutación del comportamiento del flujo se realiza consultando directamente este objeto, aislando el espacio de nombres global.

### Patrón Factory y Optimización del DOM
* **Antes:** El renderizado de tarjetas para la página principal y la sección de artículos relacionados duplicaba cadenas de texto literales HTML muy similares. Además, la actualización del feed destruía constantemente los nodos utilizando `.innerHTML = ""`, forzando al navegador a realizar repintados pesados.
* **Después:** Se implementó una función constructora única (`createPostCard`) que fabrica los elementos del DOM de manera limpia usando `document.createElement`. Para inyectar los listados filtrados, ahora se utiliza un objeto intermedio `DocumentFragment`, minimizando el impacto en el hilo de procesamiento de la interfaz (*jank*).

### Sanitización y Seguridad (Anti-XSS)
* **Antes:** Los títulos y extractos provenientes del origen de datos se concatenaban usando interpolación de texto directa dentro de directivas `.innerHTML`. Si estos textos mutaran a una entrada de usuario o API de terceros, el blog sería vulnerable a inyecciones de código malicioso (*Cross-Site Scripting*).
* **Después:** Toda inserción de datos dinámicos a las tarjetas o al cuerpo de la lectura se ejecuta utilizando la propiedad nativa `.textContent` o mediante la separación segura de nodos de párrafo, garantizando que el navegador interprete los datos puramente como texto y nunca como scripts ejecutables.

---

## 2. Robustez Visual y Consistencia en Estilos (`style.css`)

### Corrección Sintáctica y Variables
* **Antes:** El archivo de estilos finalizaba con una llave de cierre huérfana `}`, lo cual constituía un error sintáctico que ponía en riesgo la adición de futuras reglas de medios o animaciones. Asimismo, múltiples componentes usaban valores de curvatura (`border-radius`) arbitrarios y heterogéneos.
* **Después:** Se eliminó la impureza de sintaxis y se extendió el uso de variables personalizadas (`:root`) agregando tokens estandarizados para espaciados y curvas uniformes (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`), logrando una coherencia estética impecable.

### Contención Responsiva y Visual
* **Antes:** El uso de la grilla con `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` provocaba el desbordamiento horizontal (*overflow-x*) del cuerpo en dispositivos con pantallas muy estrechas (como smartphones de 320px de ancho). Adicionalmente, extractos de texto demasiado largos desfiguraban el tamaño proporcional de las tarjetas.
* **Después:** Se redefinió la columna mínima de la grilla utilizando una función de contención protectora: `minmax(min(100%, 300px), 1fr)`. También se aplicaron propiedades de truncado multibloque nativas (`-webkit-line-clamp: 3`) para forzar que los textos extensos terminen estéticamente con puntos suspensivos sin romper la simetría visual.

---

## 3. Accesibilidad Semántica y Control del Foco (`index.html` / `app.js`)

### Estructura y Jerarquía de Encabezados
* **Antes:** La vista de detalle no envolvía el artículo de manera semántica y compartía de forma confusa etiquetas `<h2>` tanto para el título primordial de la lectura actual como para los elementos de las tarjetas inferiores recomendadas.
* **Después:** Se migró la estructura hacia etiquetas semánticas nativas (`<article>`, `<nav>`). La jerarquía de encabezados se normalizó estrictamente en orden descendente: el título de la lectura principal ascendió a un nivel prominente, mientras que los posts sugeridos se encasillaron de manera correcta en un rango menor (`<h4>`).

### Control de Estados ARIA
* **Antes:** Los botones de categorías (*chips*) alteraban visualmente su estilo agregando la clase `.active`, pero no notificaban este cambio de estado a lectores de pantalla o herramientas de accesibilidad.
* **Después:** Se incorporaron los atributos interactivos `role="tab"` y `aria-selected` a cada botón. Al hacer clic en una categoría, JavaScript muta dinámicamente estos valores booleanos para comunicar el estado activo al árbol de accesibilidad en tiempo real.

### Restauración del Foco del Teclado
* **Antes:** Al navegar exclusivamente utilizando el teclado, el ingresar al detalle de un post dejaba el marcador de selección en el limbo. Peor aún, al presionar "Volver al inicio", la página subía visualmente, pero el foco se perdía por completo en lugar de quedarse donde el usuario estaba leyendo originalmente.
* **Después:** Se programó un capturador de memoria de enfoque (`state.lastFocusedCard`). Al momento de presionar el botón de regreso, el código redirige automáticamente el foco del teclado (`.focus()`) a la tarjeta exacta que originó la acción, asegurando una experiencia fluida y amigable para usuarios con capacidades especiales de navegación.