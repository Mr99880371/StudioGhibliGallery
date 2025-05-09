import React from 'react';
import './App.css';
import Gallery from './pages/gallery';
import { Provider } from 'react-redux';
import { store, persistor } from './stores/index';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Gallery />
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </PersistGate>
    </Provider>
  );
}

export default App;
