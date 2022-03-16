import { useSelector } from 'react-redux'
import { selectProfils } from '../../utils/selectors'
import Card from '../../components/Card'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import AuthService from '../../utils/Services/auth.service';
import React from 'react';



const Profils = () => {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);


    const profils = useSelector(selectProfils)


    return (
        currentUser ? (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        {profils.data.user.map((profils) => (
                            <Card
                                name={profils.name}
                                firstname={profils.firstname}
                                email={profils.email}
                            />
                        ))}
                    </div>
                </div>
            </div>
        ) : (
            <div>
                <p><span>Veulliez vous connecter pour acceder à cette page !</span></p>
                <button><Link className="nav-link" to="/">Connexion</Link></button>
            </div>
        )
    );
};

export default Profils;