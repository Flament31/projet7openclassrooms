import { useEffect, useState } from 'react';
import AuthService from '../../utils/Services/auth.service';
import React from 'react';
import { NotConnected } from '../../components/NotConnected';
import axios from 'axios';

function Profile() {
    const [currentUser, setCurrentUser] = useState(undefined);

    const [firstname, setFirstname] = useState("")
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setName(user.name);
            setFirstname(user.firstname);
            setEmail(user.email);
            setPassword(user.password);
            setControlPassword(user.password);
            setId(user.idUser);
        }
    }, []);
    console.log(currentUser);

    const handleModify = async (e) => {
        e.preventDefault();

        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(".password-confirm.error");

        passwordConfirmError.innerHTML = "";

        if (password !== controlPassword)
            passwordConfirmError.innerHTML =
                "Les mots de passe ne correspondent pas";


        else {
            await axios({
                method: "PUT",
                url: `http://localhost:8000/api/auth/user/:${id}`,
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
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    return (

        currentUser ? (
            <section>
                <div>
                    <form className="contact-form" >
                        <div className="form-group">
                            <label htmlFor="nom">Nom</label>
                            <br />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                placeholder={name}
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
                                placeholder={firstname}
                                value={firstname}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">email</label>
                            <br />
                            <input
                                type="mail"
                                id="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={email}
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
                                placeholder="Nouveau mot passe *"
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
                                onClick={handleModify}
                            />
                        </div>
                    </form>
                    <div>
                        <button>
                            Supprimer le compte
                        </button>
                    </div>
                </div>
            </section>) : (
            <NotConnected />
        )
    );
};

export default Profile;