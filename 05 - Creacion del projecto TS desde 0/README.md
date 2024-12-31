# Creacion de un proyecto react con JS manualmente 

### Comandos:
- npm create vite@latest
- npm install

### Dependencias
> React, React-DOM y @vitejs/plugin-react
>- El -E indica a npm que instale la version especificada en el package.tson 

- npm install react react-dom @types/react @types/react-dom @vitejs/plugin-react -E
> Usando el compilador (Speedy Web Compiler) SWC (Recomendado)
- npm install react react-dom @types/react @types/react-dom @vitejs/plugin-react-swc -E

### Crear archivo de configuracion de vite
> vite.config.ts
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})
```

### Configurar TS para TSX
> tsconfig.json
```
"compilerOptions": {
  ...
  "jsx": "react-jsx"
}
```

### Configurar punto de entrada
> main.ts cambiarlo a main.tsx y en index.html cambiar el punto de entrada al tsx.
```
import { createRoot } from "react-dom/client"
import { StrictMode } from 'react'
import './style.css'

// createRoot -> Sirve para renderizar la aplicacion, recibe un elemento del DOM que sera el root
const root = createRoot(document.querySelector("#app")!);

root.render(
  //StrictMode -> Sirve para detectar problemas en la aplicacion
  <StrictMode>
    <h1>Funciona</h1>
  </StrictMode>
);
```

### Añadir ESLint
npx eslint --init