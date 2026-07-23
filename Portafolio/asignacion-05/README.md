# products-app-fragile

Este proyecto funciona en el camino feliz.
Tu tarea es romperlo, detectar fallas y proponer mejoras.

No está diseñado como ejemplo perfecto.
Está diseñado para **auditar**.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

## Qué observar

- ¿Qué pasa si no hay productos que coincidan con la búsqueda?
- ¿Qué pasa mientras carga? (primeros 800ms)
- ¿Qué pasa con los productos que tienen imagen vacía o null?
- ¿Qué pasa si escribes mal el email y haces submit?
- ¿Qué pasa si LocalStorage tiene datos corruptos?
- ¿Qué responsabilidades tiene App.jsx?

## Fallas intencionales marcadas en el código

El código tiene comentarios `// ❌ FRAGILE:` que señalan exactamente dónde están los problemas. Encuéntralos, entiende por qué son un problema, y propón mejoras.
