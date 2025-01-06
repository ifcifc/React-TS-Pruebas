import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/app/App.tsx'
import { ContextProvider } from './components/context/ContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)
