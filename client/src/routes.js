import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard/index';
import About from './pages/About/index';

export default function Routing(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={ <Dashboard/> } />
                <Route path="/about" exact element={ <About/> } />
            </Routes>
        </BrowserRouter>
    )
}
