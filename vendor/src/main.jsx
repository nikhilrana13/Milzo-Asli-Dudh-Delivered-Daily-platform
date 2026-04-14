import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/es/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { DialogProvider } from './context/useDialog'
import { Provider } from 'react-redux'
import { Store,Persistor} from './redux/Store'


createRoot(document.getElementById('root')).render(
   <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor} >
       <DialogProvider>
      <BrowserRouter>
      <App />
    </BrowserRouter>
   </DialogProvider>
    </PersistGate>
   </Provider>
   
)
