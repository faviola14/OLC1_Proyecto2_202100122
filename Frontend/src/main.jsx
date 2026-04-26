import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
/* index.jsx: Punto de entrada de la aplicación React. Renderiza el componente raíz App dentro del 
elemento con id 'root'. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
