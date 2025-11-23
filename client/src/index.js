import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store  from '../src/redux/store';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store ={store}> {""}  <BrowserRouter >
   <ToastContainer/>
    <App />
    </BrowserRouter>
</Provider>
  </React.StrictMode>
);
