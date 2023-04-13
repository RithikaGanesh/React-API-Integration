import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Error from './TWIT/Error';
import Twitter from './TWIT/TWITER';
import Single from './TWIT/Single';
import { Nomatch } from './TWIT/Nomatch';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={< App />} />
      <Route path="/alltwit" element={<Twitter />} />
      <Route path="/mytwit" element={<Single />} />
      <Route path='/error' element={<Error/>}/>
      <Route path='*' element={<Nomatch/>}/>
    </Routes>
  </BrowserRouter>
)
reportWebVitals();
