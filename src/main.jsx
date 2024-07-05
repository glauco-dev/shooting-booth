import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './AppShell.jsx'
import PWABadge from './PWABadge.jsx'
import "./Struct.sass"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <PWABadge />
  </React.StrictMode>,
)