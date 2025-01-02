# Creacion de un proyecto react con JS manualmente 

### Comandos:
```sh
npm create vite@latest
npm install
```

### Dependencias
__React, React-DOM y @vitejs/plugin-react__

__El -E indica a npm que instale la version especificada en el package.json__
```sh
npm install react react-dom @vitejs/plugin-react -E
```
__Usando el compilador (Speedy Web Compiler) SWC (Recomendado)__
```sh
npm install react react-dom @vitejs/plugin-react-swc -E
```
### Crear archivo de configuracion de vite
> vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})
```

### Configurar punto de entrada
__main.js cambiarlo a main.jsx y en index.html cambiar el punto de entrada al jsx.__
> main.jsx
```js
import React from 'react'
import { createRoot } from "react-dom/client"
import { StrictMode } from 'react'
import './style.css'

// createRoot -> Sirve para renderizar la aplicacion, recibe un elemento del DOM que sera el root
const root = createRoot(document.querySelector("#app"));

root.render(
  //StrictMode -> Sirve para detectar problemas en la aplicacion
  <StrictMode>
    <h1>Funciona</h1>
  </StrictMode>
);
```

### Añadir ESLint
```sh
npm install standard --save-dev
```
>package.json
```json
"eslintConfig": {
  "extends": [
    "./node_modules/standard/eslintrc.json"
  ]
}
```
