import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import WeddingApp from '../WeddingApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeddingApp />
  </StrictMode>,
)
