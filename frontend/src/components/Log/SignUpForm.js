import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstname, setFirstname] = useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const nameError = document.querySelector(".name.error");
    const firstnameError = document.querySelector(".firstname.errors");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    passwordConfirmError.innerHTML = "";


    if (password !== controlPassword)
      passwordConfirmError.innerHTML =
        "Les mots de passe ne correspondent pas";


    else {
      await axios({
        method: "POST",
        url: "http://localhost:8000/api/auth/signup",
        data: {
          email,
          password,
          firstname,
          name
        },
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            nameError.innerHTML = res.data.errors.name;
            firstnameError.innerHTML = res.data.errors.firstname;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <div>
            <h3 className="h3">
              Enregistrement réussi, veuillez-vous connecter
            </h3>
            <SignInForm />
          </div>
        </>
      ) : (

        <form className="contact-form">

          <h2>Inscription</h2>
          <div className="col">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="nom *"
                value={name}
                autoComplete="off"
              />
            </div>
            <div className="name error"></div>
            <div className='form-group'>
              <label htmlFor="prenom">Prénom</label>
              <br />
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="prénom *"
                value={firstname}
              />
            </div>
            <div className="firstname error"></div>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <br />
              <input
                type="mail"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email *"
                value={email}
                autoComplete="off"
              />
            </div>
            <div className='form-group'>
              <label htmlFor="password">Mot de passe</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe *"
                value={password}
              />
            </div>
            <div className="password error"></div>
            <div className="form-group">
              <label htmlFor="password-conf">Confirmer mot de passe</label>
              <br />
              <input
                type="password"
                name="password"
                id="password-conf"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
              />
            </div>
            <div className="password-confirm error"></div>
            <div>
              <input
                className="btn btn-success"
                type="button"
                value="Envoyer"
                onClick={handleRegister}
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default SignUpForm;