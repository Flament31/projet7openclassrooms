import { useState } from 'react';
import axios from 'axios';

const NewArticle = () => {

    const idUser = JSON.parse(localStorage.getItem('user')).idUser;
    const token = JSON.parse(localStorage.getItem('token'));
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const onChangeText = (e) => {
        const text = e.target.value;
        setText(text);
    };

    const onChangeImageUrl = (e) => {
        const imageUrl = e.target.files[0];
        setImageUrl(imageUrl);
    };

    const handlePost = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        formData.append('imageUrl', imageUrl);
        formData.append('idUser', idUser);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        axios
            .post(`http://localhost:8000/api/post/`, formData, {
                config,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (


        <form className="contact-form text-white mx-auto">

            <h2 className='h2 my-3'>Créez votre publication</h2>
            <div className="col pl-5">
                <div className="form-group">
                    <label htmlFor="nom">Titre</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={onChangeTitle}
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
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={onChangeImageUrl}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="prenom">Votre publication</label>
                    <br />
                    <textarea
                        id="text"
                        name="text"
                        onChange={onChangeText}
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


