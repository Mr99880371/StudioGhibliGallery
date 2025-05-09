import React from 'react';
import './App.css';
import Gallery from './pages/gallery.tsx';
import { Provider } from 'react-redux';
import { store, persistor } from './stores/index.ts';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Gallery />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
