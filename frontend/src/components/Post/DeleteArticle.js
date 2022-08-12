import axios from 'axios';


const DeleteArticle = (id) => {

    const idPost = Object.values(id);

    const handleDelete = () => {
        axios
            .delete(`http://localhost:8000/api/post/${idPost}`, {
                data: {
                    idPost
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                window.location.reload(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (

        <div>
            <button onClick={handleDelete}>
                Supprimer
            </button>
        </div>
    );
};

export default DeleteArticle;