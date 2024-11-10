// src/App.js
import React from 'react';
import Orders from './components/Orders';
import Products from './components/Products';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
      <h1>Hospital Management System</h1>
      <Orders />
      <Products />
      <Users />
    </div>
  );
}

export default App;
