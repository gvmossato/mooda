import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './base.css';

global.dateFormatServer = "YYYY-MM-DD HH:mm:ss"
global.dateFormatClient = "YYYY-MM-DD"
global.timeZone = "America/Sao_Paulo"

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,

    document.getElementById('root')
);
