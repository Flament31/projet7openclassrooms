import { useEffect, useState } from 'react';
import AuthService from '../../utils/Services/auth.service';
import React from 'react';
import { NotConnected } from '../../components/NotConnected';
import Post from '../../components/Post';

const Home = () => {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        currentUser ? (
            <div className="main">
                <div className="card">
                    <div className="card-body">
                        <Post Articles={true} NewArticle={false} />
                    </div>
                </div>
            </div>
        ) : (
            <NotConnected />
        )
    );
}

export default Home