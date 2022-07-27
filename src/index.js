import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {Provider}  from "react-redux";
import store, { persist }   from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render( 
  // <React.StrictMode>
    
    <Provider store={store}>

    <PersistGate persistor={persist}>

     <App /> 
    
    </PersistGate>

    </Provider>
    
  // </React.StrictMode>
);  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
