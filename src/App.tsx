import React from 'react';
import './App.css';
import Gallery from './pages/gallery.tsx';
import { Provider } from 'react-redux';
import { store } from './stores/index.ts';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Gallery />
    </div>
    </Provider>
  );
}

export default App;
