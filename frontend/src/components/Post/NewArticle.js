import { useState } from 'react';
import axios from 'axios';

const NewArticle = () => {

    const signedToken = localStorage.getItem('secret');
    const id = JSON.parse(localStorage.getItem('user')).idUser;
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    const handlePost = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('text', text);
        formData.append('imageUrl', imageUrl);
        formData.append('idUser', id);
        formData.append('title', title);


        const config = {
            headers: {
                Authorization: `Bearer ${signedToken}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        axios
            .post(`http://localhost:8000/api/post`, formData, {
                config,
            })

            .then((res) => {
                window.location.reload(false);
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });

    };


    return (


        <form className="contact-form">

            <h2>Créez votre publication</h2>
            <div className="col">
                <div className="form-group">
                    <label htmlFor="nom">Titre</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titre *"
                        value={title}
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
                        accept="image/png, image/jpeg"
                        onChange={(e) => setImageUrl(e.target.files[0])}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="prenom">Votre publication</label>
                    <br />
                    <textarea
                        id="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                </div>
                <div>
                    <input
                        className="btn btn-success"
                        type="button"
                        value="publier"
                        onClick={handlePost}
                    />
                </div>
            </div>
        </form>
    )

}

export default NewArticle


