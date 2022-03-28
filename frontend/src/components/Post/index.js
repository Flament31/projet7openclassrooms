import React, { useState } from "react";
import NewArticle from "./NewArticle";
import Articles from "./Articles";

const Log = (props) => {
    const [newArticleModal, setNewArticleModal] = useState(props.newArticle);
    const [articlesModal, setArticlesModal] = useState(props.articles);

    const handleModals = (e) => {
        if (e.target.id === "newArticle") {
            setArticlesModal(false);
            setNewArticleModal(true);
        } else if (e.target.id === "articles") {
            setNewArticleModal(false);
            setArticlesModal(true);
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
                    id="articles"
                    className={articlesModal ? "btn btn-success" : null}
                >
                    Articles
                </button>
            </div>
            <div className="row justify-content-center">
                {newArticleModal && <NewArticle />}

            </div>
            <div className="row justify-content-center">
                {articlesModal && <Articles />}
            </div>
        </div>
    );
};

export default Log;