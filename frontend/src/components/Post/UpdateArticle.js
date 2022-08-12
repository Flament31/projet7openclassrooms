import { useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../../utils/Services/auth.service";
import { NotConnected } from "../NotConnected";


const UpdateArticle = (props) => {

    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const initialArticleState = {
        id: null,
        title: "",
        text: "",
        imageUrl: ""
    };
    const [currentArticle, setCurrentArticle] = useState(initialArticleState);

    const getArticle = (id) => {
        return axios.get(`http://localhost:8000/api/post/${id}`, {
            data: {
                id
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                setCurrentArticle(res.data);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getArticle(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentArticle({ ...currentArticle, [name]: value });
    };

    const updateArticle = () => {

        const data = {
            id: currentArticle.id,
            title: currentArticle.title,
            text: currentArticle.text,
            imageUrl: currentArticle.imageUrl
        };

        const Update = (id) => {
            return axios.put(`http://localhost:8000/api/post/${id}`,
                data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        };

        Update(currentArticle.id, currentArticle)
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return currentUser ? (
        <form className="contact-form">

            <h2>Modifier votre publication</h2>
            <div className="col">
                <div className="form-group">
                    <label htmlFor="nom">Titre</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleInputChange}
                        value={currentArticle.title}
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nom">Partager une image</label>
                    <br />
                    <input
                        type="file"
                        id="file"
                        name="imageUrl"
                        accept="image/png, image/jpeg, image/jpg"
                        value={currentArticle.imageUrl}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="prenom">Votre publication</label>
                    <br />
                    <textarea
                        id="text"
                        name="text"
                        onChange={handleInputChange}
                        value={currentArticle.text}
                    />
                </div>
                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={updateArticle}>
                    Update
                </button>
            </div>
        </form>
    ) : (<NotConnected />)
}

export default UpdateArticle