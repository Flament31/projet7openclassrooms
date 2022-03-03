import React from 'react';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Profils from "./pages/Profils";
import { UidContext } from "./contexts/auth";
import Header from './components/Header';
import NewPost from './pages/NewPost';


const App = () => {

  const uid = useState(null);

  return (
    <UidContext.Provider value={uid}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />,
          <Route exact path="/profils" element={<Profils />} />
          <Route exact path="/newPost" element={<NewPost />} />
        </Routes>
      </Router>
    </UidContext.Provider>
  );
};

export default App;