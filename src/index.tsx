import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/base.css';
import './styles/pages/gallery.css';
import './styles/components/filterControls.css';
import './styles/components/movieCard.css';
import './styles/components/movieHeader.css';
import './styles/components/searchBar.css';
import './styles/components/notesModal.css';
import './styles/components/ratingFilterDrop.css';

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
