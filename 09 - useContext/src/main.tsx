import { createRoot } from "react-dom/client"
import "./index.css"
import { ContextProvider } from "./components/context/ContextProvider.tsx"
import { App } from "./components/app/App.tsx"

createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)
