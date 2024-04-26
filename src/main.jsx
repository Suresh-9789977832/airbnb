import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UsercontextProvider from './Usercontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsercontextProvider>
        <App />
        </UsercontextProvider>
    </BrowserRouter>
  
  </React.StrictMode>,
)
