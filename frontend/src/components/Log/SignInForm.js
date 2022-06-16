import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../../utils/Services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const SignInForm = () => {
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
        () => {
          navigate('/Home')
          window.location.reload();
          console.log(localStorage);
        },
        (error) => {
          const resMessage =
            (error.res &&
              error.res.data &&
              error.res.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleLogin} className="contact-form" ref={form}>
      <h2>Connexion</h2>
      <div className="col">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <br />
          <Input
            type="text"
            name="email"
            id="email"
            onChange={onChangeEmail}
            value={email}
          />
        </div>



        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <br />
          <Input
            type="password"
            name="password"
            id="password"
            onChange={onChangePassword}
            value={password}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Connexion</span>
          </button>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton ref={checkBtn} />
      </div>
    </Form>
  );
};

export default SignInForm;