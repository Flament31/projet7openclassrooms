import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from './components/Header';
import Connexion from './pages/Connexion';


const App = () => {

  return (
    <Router>
      <Header />
      <Routes>

        <Route exact path="/" element={<Connexion />} />,

        <Route exact path="/Profile" element={<Profile />} />,
        <Route exact path="/Home" element={<Home />} />,

      </Routes>
    </Router>
  );
};

export default App;