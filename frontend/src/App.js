import React from 'react';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import { hasAuthenticated } from "./services/AuthApi";
import Auth from "./contexts/auth";
import Header from './components/Header';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  return (
    <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </Auth.Provider>
  );
};

export default App;