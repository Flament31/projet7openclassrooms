import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Profils from "./pages/Profils";

import Header from './components/Header';
import NewPost from './pages/NewPost';

import Post from "./pages/Post";




const App = ({ component: Component, ...rest }) => {

  const auth = useSelector(state => state);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />,

        <Route {...rest}
          render={(props) =>
            auth === true ? (
              <Component {...props} />
            ) : (
              <Navigate to="/" />
            )
          } exact auth={auth.userId != null} path="/profils" element={<Profils />} />,
        <Route {...rest}
          render={(props) =>
            auth === true ? (
              <Component {...props} />
            ) : (
              <Navigate to="/" />
            )
          } exact auth={auth.userId != null} path="/Post" element={<Post />} />,
        <Route {...rest}
          render={(props) =>
            auth === true ? (
              <Component {...props} />
            ) : (
              <Navigate to="/" />
            )
          } exact auth={auth.userId != null} path="/newPost" element={<NewPost />} />
      </Routes>
    </Router>
  );
};

export default App;