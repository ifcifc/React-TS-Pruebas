import { createRoot } from "react-dom/client"
import './style.css'
import { StrictMode } from "react";
import App from "./App";

// createRoot -> Sirve para renderizar la aplicacion, recibe un elemento del DOM que sera el root
const root = createRoot(document.querySelector("#app")!);

//StrictMode -> Sirve para detectar problemas en la aplicacion
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);