import React, { useState, useEffect } from "react";
import EventBus from "../../utils/Check/EventBus";
import AuthService from "../../utils/Services/auth.service";


const Logout = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        localStorage.clear();
        window.location.reload();
    };

    return (

        currentUser ? (
            <li onClick={logOut}>
                <button >Deconnexion</button>
            </li>
        ) : (<div></div>)

    );
};

export default Logout;