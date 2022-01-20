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
                                    <a className="nav-link" href="index.html">Portail</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="panier.html">Profil</a>
                                </li>
                                <li>
                                    <button>Deconnexion</button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Header