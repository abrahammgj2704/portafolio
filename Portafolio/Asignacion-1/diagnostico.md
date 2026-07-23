# Diagnóstico Técnico — Blog del Mundial

## 1. Diagnóstico de JavaScript (`app.js`)

### Puntos a mejorar
* **Contaminación del Scope Global:** Variables de estado como `currentFilterTag`, `currentSearchQuery` y `currentArticleId` están declaradas de forma suelta en el script. Si el proyecto crece o se integran scripts de terceros, es propenso a colisiones de nombres.
* **Manipulación ineficiente del DOM (Repintado constante):** Al cambiar de filtro o buscar, la función `renderHome()` borra por completo el contenido del contenedor con `postsGrid.innerHTML = ""` y vuelve a crear y añadir nodos mediante `appendChild` repetidamente en el hilo principal.
* **Duplicación de lógica en componentes repetidos:** Las estructuras HTML de las tarjetas principales en `renderHome()` y de los artículos relacionados en `renderRelatedPosts()` son casi idénticas, pero están escritas dos veces por separado en cadenas de texto literales.
* **Falta de sanitización de datos (XSS potencial):** Aunque actualmente la información proviene de un archivo local controlado (`posts`), se inyectan textos de forma directa en el DOM usando `innerHTML` (`${post.title}`). Si en el futuro esta data muta a una API externa o permite comentarios de usuarios, introduce una vulnerabilidad crítica de inyección de scripts.

### Riesgos técnicos
* **Rendimiento en crecimiento lineal ($O(N)$):** Al buscar por texto, la aplicación filtra secuencialmente el array entero de artículos. Si la base de datos simulada pasa de 6 artículos a cientos, la interfaz sufrirá micro-congelamientos (*jank*) en dispositivos móviles durante la escritura en el input.
* **Fragilidad en la navegación Secuencial:** Los botones "Anterior" y "Siguiente" dependen estrictamente de la posición posicional (`index`) dentro del array estático `posts`. Si en algún momento los artículos se ordenan de forma dinámica (por ejemplo, de más recientes a más antiguos) o se eliminan elementos intermedios, la navegación perderá coherencia o romperá el flujo esperado.

---

## 2. Diagnóstico de CSS (`style.css`)

### Puntos a mejorar
* **Error de sintaxis de cierre:** Al final del archivo existe una llave de cierre huérfana `}` que no pertenece a ninguna regla de medios (`@media`) o bloque previo. Esto puede causar comportamientos impredecibles si se añade más código abajo.
* **Falta de abstracción en espaciados y curvas:** Tienes declaradas variables para colores y transiciones, pero valores repetitivos como los radios de borde (`border-radius: 12px`, `16px`, `8px`, `10px`, `20px`) y los márgenes/paddings están hardcodeados de forma inconsistente por todo el documento.
* **Falta de contención visual para textos largos:** Las tarjetas (`.card`) no implementan un límite de líneas ni truncado (`text-overflow: ellipsis` o `-webkit-line-clamp`) para los extractos del subtítulo. Títulos excesivamente largos romperán la simetría visual de la cuadrícula.

### Riesgos técnicos
* **Riesgo de desbordamiento en el Grid:** La regla `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` es excelente para la responsividad, pero en pantallas de celulares muy pequeños (como un iPhone SE de 320px de ancho) el espacio restante sumado al padding lateral del contenedor (`padding: 0 24px`) forzará un desbordamiento horizontal (*overflow-x*).

---

## 3. Diagnóstico de HTML (`index.html`) y Accesibilidad (a11y)

### Puntos a mejorar
* **Semántica del detalle de artículo:** El contenedor principal del detalle es una sección (`#detail-view`), la cual contiene una barra de navegación trasera, luego un `<article>` y finalmente una sección de relacionados. Sería estructuralmente más limpio que la vista completa de detalle use la etiqueta semántica `<article>` en su raíz para albergar su propia cabecera y cuerpo.
* **Uso confuso de etiquetas de encabezado (`<h>`)**: En las tarjetas inyectadas dinámicamente estás usando etiquetas `<h2>` para los títulos de cada post individual. Al navegar a la vista de detalle, vuelves a pintar un `<h2>` para el título principal del artículo, compartiendo la misma jerarquía que los artículos sugeridos al final de la página.

### Riesgos técnicos y de Accesibilidad
* **Botones inaccesibles para lectores de pantalla:** Los botones de "Chips" (Filtros de categorías) cambian visualmente de estado mutando la clase `.active`, pero no informan de este cambio al árbol de accesibilidad. Un usuario con discapacidad visual no sabrá cuál filtro está activado.
* **Pérdida de foco del teclado:** Al hacer clic en una tarjeta y entrar al modo detalle, el foco del teclado (tabulación) se queda en el limbo o atrapado en la sección oculta. Al presionar "Volver al inicio", la página sube con `window.scrollTo`, pero el foco no se restablece en la tarjeta que el usuario seleccionó originalmente, arruinando la navegación por teclado.