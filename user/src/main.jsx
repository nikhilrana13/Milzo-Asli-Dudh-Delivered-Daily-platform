import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DialogProvider } from './context/DialogContext'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Persistor, Store, } from "./redux/Store"

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>
      <BrowserRouter>
        <DialogProvider>
          <App />
        </DialogProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
