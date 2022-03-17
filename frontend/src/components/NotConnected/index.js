import { Link } from "react-router-dom";

export const NotConnected = () => {
    return (
        <div>
            <p><span>Veulliez vous connecter pour acceder à cette page !</span></p>
            <button><Link className="nav-link" to="/">Connexion</Link></button>
        </div>
    )
}