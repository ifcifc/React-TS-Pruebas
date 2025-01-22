import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/app/App.tsx'
import SettingsContextProvider from './components/settingsContext/SettingsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <SettingsContextProvider>
    <App />
  </SettingsContextProvider>,
)
