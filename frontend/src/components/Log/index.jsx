import { useState } from 'react'
import axios from "axios"


const Signup = () => {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        await axios({
            method: "POST",
            url: "http://localhost:8000/api/auth/signup",
            data: {
            name,
            firstname,
            email,
            password,
            },
        })
        .then((res) => {
            console.log(res);          
        })
    };
    
    return (
        <div className="container" >
            <div className="row justify-content-center">
                
                <form className="contact-form">

                    <h2>Inscription</h2>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="nom">Nom</label> 
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
                        <div className='form-group'>
                            <label htmlFor="prenom">Prénom</label> 
                            <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder="prénom *"
                            value={firstname}
                            />
                        </div>                             
                        <div className="form-group">
                            <label htmlFor="email">email</label> 
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
                            <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mot de passe *"
                            value={password}
                            />
                        </div>
                        <div>
                           <input
                            className="btn btn-success"
                            type="button"
                            value="Envoyer"
                            onClick={handleSubmit}
                            /> 
                        </div>   
                    </div>
                </form>
            </div>
        </div>       
    );
};

  
export default Signup;