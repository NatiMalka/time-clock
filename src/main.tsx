import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/attendance-clock">
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);
