import React from "react";
import { useDispatch } from "react-redux";
import { DISCONNECT } from "../../utils/reducers";

const Logout = () => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({ type: DISCONNECT });
        window.location = "/";
    };

    return (
        <li onClick={logout}>
            <button>Deconnexion</button>
        </li>
    );
};

export default Logout;