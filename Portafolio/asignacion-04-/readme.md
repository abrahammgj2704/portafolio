# asignacion-04

## Descripción breve
`asignacion-04` es una aplicación web desarrollada con React y Vite para listar productos provenientes de Fake Store API y gestionar favoritos desde la interfaz.

## Requisitos previos
Para ejecutar este proyecto necesitas:
- Node.js 20 o superior
- npm 10 o superior
- Un navegador moderno con soporte para LocalStorage

## Instalación
1. Clona el repositorio o accede a la carpeta del proyecto.
2. En la raíz de la carpeta `asignacion-04-`, ejecuta:
```bash
npm install
```
3. No se requieren variables de entorno para esta asignación, ya que la aplicación consume la API pública directamente.

## Ejecución en modo desarrollo
```bash
npm run dev
```
Luego abre la URL que indique Vite en el navegador.

## Compilación para producción
```bash
npm run build
```

## Verificación de calidad básica
```bash
npm run lint
```

## Estructura del proyecto
- `src/`: código fuente de la aplicación React.
  - `App.jsx`: componente principal que maneja el estado global de favoritos.
  - `components/`: componentes de UI.
    - `ProductList.jsx`: carga productos y renderiza la grilla.
    - `ProductCard.jsx`: muestra la tarjeta del producto y el botón de favorito.
  - `services/`: lógica de persistencia.
    - `favoritesStorage.js`: carga y guarda los ID de favoritos en LocalStorage.
- `index.html`: punto de entrada HTML.
- `vite.config.js`: configuración de Vite.
- `package.json`: scripts y dependencias.
