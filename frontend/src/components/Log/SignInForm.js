import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CONNECT } from "../../utils/reducers";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state);
  useEffect(() => {
    if (auth.userId != null) history.push("/posts");
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "POST",
      url: "http://localhost:8000/api/auth/login",
      data: {
        email,
        password,
      },
    })


      .then((res) => {

        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          dispatch({
            type: CONNECT,
            payload: {
              token: res.token,
              userId: res.userId,
            },
          });
          window.location = "/Post";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} className="contact-form">
      <h2>Connexion</h2>
      <div className="col">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="email error"></div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="password error"></div>
        <div>
          <input type="submit" value="Se connecter" className="btn btn-success" />
        </div>
      </div>
    </form>
  );
};

export default SignInForm;