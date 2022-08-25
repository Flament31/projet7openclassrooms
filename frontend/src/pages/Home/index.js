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
            <div className="card bg-dark mx-auto my-3 container border-dark rounded py-3 text-white" style={{ width: "35rem" }}>
                <div className="card-body">
                    <Post Articles={true} NewArticle={false} UpdateArticle={false} />
                </div>
            </div>
        ) : (
            <NotConnected />
        )
    );
}

export default Home