import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfils} from '../../utils/selectors'
import { fetchOrUpdateProfils } from '../../features/profils'
import Card from '../../components/Card'


const Profils = () => {

    // On utilise dispatch pour exécuter un thunk
    const dispatch = useDispatch()

    // on utilise useEffect pour lancer la requête au chargement du composant
    useEffect(() => {
        // On envoie le thunk à dispatch
        // C'est Redux-Thunk qui va s'occuper de l'exécuter pour nous
        dispatch(fetchOrUpdateProfils)
    }, [dispatch])


    const profils = useSelector(selectProfils)


    return (
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
    );
};

export default Profils;