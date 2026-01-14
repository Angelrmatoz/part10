# Mi App — Repositories (Full Stack Open — Parte 10)

Aplicación móvil de ejemplo (React Native + Expo) que muestra una lista de repositorios revisados. Incluye un backend GraphQL (rate-repository-api) que sirve datos y persistencia en SQLite.

Estructura relevante

- App (cliente): App.js, src/ (components, hooks)
- Backend: rate-repository-api/ (GraphQL con Apollo Server, Objection, SQLite)

Requisitos

- Node (recomendado >= 20)
- npm
- Expo CLI (para ejecutar la app móvil)

Instalación y ejecución (rápida)

1) Backend (rate-repository-api)

- cd rate-repository-api
- Copia `.env.template` a `.env` y completa las variables (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET si quieres personalizarlo)
- npm install
- npm run build        # ejecuta migraciones y crea la DB
- (opcional) npm run seed:run  # inicializa datos (sobrescribe datos existentes)
- npm start            # arranca el servidor (Apollo: http://localhost:4000 por defecto)

Consulta `rate-repository-api/README.md` para más detalles.

2) Cliente (mi-app)

- Desde la raíz del proyecto: npm install
- Define la variable de entorno `APOLLO_URI` para que apunte al servidor Apollo (ej.: http://localhost:4000)
  - macOS / Linux:
    APOLLO_URI=http://localhost:4000 npm start
  - Windows (cmd):
    set APOLLO_URI=http://localhost:4000 && npm start
  - Windows (PowerShell):
    $env:APOLLO_URI='http://localhost:4000'; npm start

Nota: en algunos emuladores Android puede ser necesario usar `10.0.2.2` en vez de `localhost`.

Comandos útiles

- Cliente (raíz):
  - npm start
  - npm run android
  - npm run ios
  - npm run web
  - npm run lint

- Backend (rate-repository-api):
  - npm start
  - npm run start:dev
  - npm run lint
  - npm test
  - npm run migrate:latest
  - npm run seed:run

Desarrollo

- El cliente usa Apollo Client (App.js) y la consulta de repositorios está en `src/hooks/useRepositories.js`.
- Componentes principales: `src/components/RepositoryList.jsx`, `RepositoryItem.jsx`, `AppBar.jsx`, `SignIn.jsx`.
- La vista de inicio de sesión (`SignIn.jsx`) actualmente es un ejemplo y no realiza la autenticación con el servidor (hace console.log en submit).
- El backend contiene el esquema GraphQL en `rate-repository-api/src/graphql` y guarda datos en `rate-repository-api/database.sqlite`.

Tests y lint

- Backend: cd rate-repository-api && npm test
- Lint cliente: npm run lint
- Lint backend: cd rate-repository-api && npm run lint

Más información

Revisa `rate-repository-api/README.md` para instrucciones completas del servidor.

---

Este proyecto es parte del curso Full Stack Open, Parte 10: Aplicaciones móviles con React Native y Expo.