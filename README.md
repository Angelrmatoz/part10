# Lista de Repositorios Revisados (Full Stack Open - Parte 10)

Este proyecto es una aplicación de ejemplo desarrollada como parte del curso **Full Stack Open** (Parte 10: React Native). La aplicación muestra una lista de repositorios revisados, simulando una interfaz similar a la de GitHub, y está construida usando React Native y Expo.

## Características principales

- **Visualización de repositorios:**
  - Muestra una lista de repositorios con información relevante: nombre completo, descripción, lenguaje, número de estrellas, forks, reviews y rating.
  - Cada repositorio incluye la imagen de avatar del autor.
  - Los números grandes (como estrellas y forks) se formatean en miles (ejemplo: 21553 → 21.5k).

- **Barra de aplicaciones (AppBar):**
  - Incluye una barra superior con el nombre de la pestaña activa ("Repositories").
  - Respeta el espacio del notch y la barra de estado en dispositivos móviles.

- **Diseño pulido:**
  - Fondo general gris claro (`#e1e4e8`).
  - Cada elemento de la lista tiene fondo blanco y bordes redondeados.
  - La etiqueta de lenguaje tiene fondo azul (`#0366d6`).
  - Estilos responsivos y modernos.

- **Componentización:**
  - Componentes reutilizables y modulares: `RepositoryList`, `RepositoryItem`, `AppBar`, `AppBarTab`.
  - Separación clara de responsabilidades y estilos.

## Estructura del proyecto

```
mi-app/
├── App.js
├── index.js
├── src/
│   ├── Main.jsx
│   └── components/
│       ├── AppBar.jsx
│       ├── AppBarTab.jsx
│       ├── RepositoryList.jsx
│       └── RepositoryItem.jsx
├── assets/
├── package.json
└── ...
```

## Instalación y ejecución

1. Clona el repositorio o descarga el código fuente.
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación con Expo:
   ```sh
   npm start
   ```
4. Abre la app en un emulador, dispositivo físico o en el navegador (web) usando Expo Go o el navegador web.

## Tecnologías utilizadas
- React Native
- Expo
- JavaScript (ES6+)

## Notas adicionales
- El proyecto está pensado como base para prácticas de React Native y no incluye backend ni persistencia real de datos.
- El diseño y la estructura siguen las recomendaciones del curso Full Stack Open.
- Puedes modificar y extender los componentes para agregar nuevas funcionalidades, como navegación entre vistas o manejo de datos reales desde una API.

## Autor
- Proyecto realizado como parte del curso [Full Stack Open](https://fullstackopen.com/).

---
¡Explora el código, experimenta con los estilos y sigue aprendiendo React Native!

