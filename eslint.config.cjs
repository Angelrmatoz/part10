// eslint.config.cjs
// Configuración plana mínima de ESLint para este proyecto (JS/JSX + React).
// Ajusta o amplía según necesites (reglas, plugins, parser, etc.).

module.exports = [
  // Ignorar archivos innecesarios
  {
    ignores: ["node_modules/**", "dist/**", "android/**", "ios/**"],
  },

  // Reglas aplicables a archivos JS/JSX
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    // Usamos el plugin react instalado en devDependencies
    plugins: {
      react: require("eslint-plugin-react"),
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // Desactiva regla obsoleta para entornos modernos de React
      "react/react-in-jsx-scope": "off",
      // Puedes añadir más reglas aquí según prefieras
    },
  },
];
