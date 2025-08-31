import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RestaurantCardL from './components/RestaurantCardL.tsx'
import { sampleRestaurants } from './schema/sampleData.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
