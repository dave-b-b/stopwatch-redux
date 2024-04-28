import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit"
import {Provider} from 'react-redux'
import timeReducer from "./features/time"

const store = configureStore({
    reducer: {
        time: timeReducer,
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Change React.StrictMode => Provider
  // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  // </React.StrictMode>
);
