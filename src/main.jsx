import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Создаю лого на вкладку
const logo = document.createElement('link');
logo.setAttribute('rel', 'icon');
logo.setAttribute('href', '/img/logo.png');
document.querySelector('head').append(logo);

// Создаю название для вкладки
document.title = 'Sneakers';