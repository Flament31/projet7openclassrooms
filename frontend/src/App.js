import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import Profils from "./pages/Profils";
import Header from './components/Header';
import NewPost from './pages/NewPost';
import Post from "./pages/Post";


const App = () => {

  return (
    <Router>
      <Header />
      <Routes>

        <Route exact path="/" element={<Home />} />,

        <Route exact path="/profils" element={<Profils />} />,
        <Route exact path="/Post" element={<Post />} />,
        <Route exact path="/newPost" element={<NewPost />} />

      </Routes>
    </Router>
  );
};

export default App;