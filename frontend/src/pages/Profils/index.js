import { useSelector } from 'react-redux'
import { selectProfils } from '../../utils/selectors'
import Card from '../../components/Card'
import { useEffect, useState } from 'react';
import AuthService from '../../utils/Services/auth.service';
import React from 'react';
import { NotConnected } from '../../components/NotConnected';



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
            <NotConnected />
        )
    );
};

export default Profils;