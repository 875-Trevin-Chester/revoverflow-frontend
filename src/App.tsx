import React from 'react';
import './App.css';
import { MainComponent } from './components/main.component';
import { store } from './store';
import { Provider } from 'react-redux';


function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <MainComponent />
        </Provider>
    </div>
  );
}

export default App;
