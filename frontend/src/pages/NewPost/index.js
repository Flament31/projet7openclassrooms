import React, { useState } from "react";
import axios from "axios";

const NewPost = () => {

    const [formSubmit, setFormSubmit] = useState(false);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");


    const handlePost = (e) => {
        e.preventDefault();

        axios({
            method: "POST",
            url: "http://localhost:8000/api/?/?",
            data: {
                text,
                title
            },
        })

            .then(() => { setFormSubmit(true); })
            .catch((err) => console.log(err));
    }

    return (
        <>
            {formSubmit ? (
                <>
                    <div>
                        <h3 className="h3">
                            Votre publication a bien été posté !
                        </h3>
                    </div>
                </>

            ) : (
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
            )}
        </>
    );
}

export default NewPost;