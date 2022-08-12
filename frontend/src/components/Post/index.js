import React, { useState } from "react";
import NewArticle from "./NewArticle";
import Post from "./Post";

const IndexArticle = (props) => {


    const [newArticleModal, setNewArticleModal] = useState(props.newArticle);
    const [postModal, setPostModal] = useState(props.post);


    const handleModals = (e) => {
        if (e.target.id === "newArticle") {
            setPostModal(false);
            setNewArticleModal(true);
        } else if (e.target.id === "post") {
            setNewArticleModal(false);
            setPostModal(true);
        }
    };


    return (

        <div className="container" >
            <div className="row justify-content-center">
                <button
                    onClick={handleModals}
                    id="newArticle"
                    className={newArticleModal ? "btn btn-success" : null}
                >
                    Publier un article
                </button>
                <button
                    onClick={handleModals}
                    id="post"
                    className={postModal ? "btn btn-success" : null}
                >
                    Articles
                </button>
            </div>
            <div className="row justify-content-center">
                {newArticleModal && <NewArticle />}

            </div>
            <div className="row justify-content-center">
                {postModal && <Post />}
            </div>
        </div>
    )
};

export default IndexArticle;
