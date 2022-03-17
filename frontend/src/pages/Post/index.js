import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import AuthService from '../../utils/Services/auth.service';
import React from 'react';
import { NotConnected } from '../../components/NotConnected';

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
            <NotConnected />
        )
    );
}

export default Post