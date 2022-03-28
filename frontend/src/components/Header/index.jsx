import { Link } from 'react-router-dom'
import Logout from '../Log/logout'



function Header() {


    return (
        <div id="header" className="bg-dark">
            <div className="container">
                <div className="row h1">
                    <h1 className="text-white">Titre</h1>
                </div>
                <div className="row">
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
                                    <Link className="nav-link" to="/Profils">Profils</Link>
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