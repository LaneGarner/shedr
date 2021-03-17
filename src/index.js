import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import StoreProvider from "./Store.js";



ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);