import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'; // React 18
import { createRoot } from 'react-dom/client'; // Import BrowserRouter here
import App from './App'; // Import your App component
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')).render(

 <StrictMode>

    <App />
  </StrictMode>
  
)