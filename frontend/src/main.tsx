import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// @ts-ignore: side-effect import for font CSS (no type declarations)
import "@fontsource/jetbrains-mono";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
