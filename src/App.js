import React from 'react';
import './App.css';
import ProductsList from './components/ProductsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Management</h1>
      </header>
      <ProductsList />
    </div>
  );
}

export default App;
