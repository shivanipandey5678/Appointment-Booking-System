import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext.jsx';
import { DoctorProvider } from './context/DoctorContext.jsx';
import { AppProvider } from './context/AppContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminProvider>
      <DoctorProvider>
        <AppProvider>
          <App />
        </AppProvider>
        
     </DoctorProvider>

    </AdminProvider>



  </BrowserRouter>,
)
