import { Link } from 'react-router-dom';
import Logout from '../Log/logout';

function Header() {


    return (
        <div id="header" className="bg-dark">
            <div className="container">
                <div className="col h1">
                    <h1 className="text-white">Groupomania</h1>
                </div>
                <div className="col">
                    <nav className="col navbar navbar-expand-md navbar-dark">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div id="navbarContent" className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/Home">Portail</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Profile">Profile</Link>
                                </li>
                                <Logout />
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Header