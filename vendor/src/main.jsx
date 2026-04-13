import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DialogProvider } from './context/useDialog'


createRoot(document.getElementById('root')).render(
   <DialogProvider>
      <BrowserRouter>
      <App />
    </BrowserRouter>
   </DialogProvider>
  
  
)
