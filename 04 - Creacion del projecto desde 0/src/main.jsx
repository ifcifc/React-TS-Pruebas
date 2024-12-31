import { createRoot } from "react-dom/client"
import { StrictMode } from 'react'
import './style.css'
import App from './App';

// createRoot -> Sirve para renderizar la aplicacion, recibe un elemento del DOM que sera el root
const root = createRoot(document.querySelector("#app"));

root.render(
  //StrictMode -> Sirve para detectar problemas en la aplicacion
  <StrictMode>
    <App />
  </StrictMode>
);

