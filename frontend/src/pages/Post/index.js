import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import AuthService from '../../utils/Services/auth.service';
import React from 'react';

const Post = () => {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        currentUser ? (
            <div>
                <button><Link className="nav-link" to="/newPost">Créer une publication</Link></button>
            </div>
        ) : (
            <div>
                <p><span>Veulliez vous connecter pour acceder à cette page !</span></p>
                <button><Link className="nav-link" to="/">Connexion</Link></button>
            </div>
        )
    );
}

export default Post