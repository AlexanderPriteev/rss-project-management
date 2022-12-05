import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './state/translate';
import { storeRedux } from './state';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={storeRedux}>
      <App />
    </Provider>
  </React.StrictMode>
);
