import Log from "../../components/Log";
import { createContext } from 'react';
import React, { useContext } from "react";
import Post from "../../components/Post/NewPostForm";

const Home = () => {

    const UidContext = createContext();
    const uid = useContext(UidContext);

    return (
               
        <div className="main">
            <div className="card">
                <div className="card-body">
                    {uid ? <Post /> : <Log signin={true} signup={false} />}                   
                </div>
            </div>    
        </div>
    );
};

export default Home;