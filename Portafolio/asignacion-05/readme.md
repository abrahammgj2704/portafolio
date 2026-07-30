# asignacion-05

## Descripción breve
`asignacion-05` es una aplicación web React que simula una tienda de productos con búsqueda, favoritos, validación de suscripción y manejo de estados de carga y error. El proyecto está pensado como una demostración de auditoría de código y de identificación de fragilidades.

## Requisitos previos
Para ejecutar este proyecto necesitas:
- Node.js 18 o superior
- npm 9 o superior
- Un navegador moderno

## Instalación
1. Accede a la carpeta del proyecto.
2. Instala las dependencias:

```bash
npm install
```

3. No se requieren variables de entorno para esta asignación.

## Ejecución en modo desarrollo
```bash
npm run dev
```

Luego abre la URL local que proporcione Vite.

## Compilación para producción
```bash
npm run build
```

## Estructura del proyecto
- `src/`: contiene la lógica principal de la aplicación.
  - `App.jsx`: componente principal que compone la interfaz.
  - `components/`: componentes de presentación y formularios.
  - `hooks/`: hooks personalizados para productos y favoritos.
  - `constants.js`: constantes reutilizables como regex e imagen de respaldo.
  - `mockProducts.js`: catálogo local de productos simulados.
  - `styles.css`: estilos de la interfaz.
- `vite.config.js`: configuración de Vite.
- `package.json`: scripts y dependencias.
