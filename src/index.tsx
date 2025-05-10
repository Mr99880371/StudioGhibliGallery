import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/base.css';
import './styles/gallery.css';
import './styles/filterControls.css';
import './styles/movieCard.css';
import './styles/movieHeader.css';
import './styles/searchBar.css';
import './styles/notesModal.css';
import './styles/ratingFilterDrop.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
