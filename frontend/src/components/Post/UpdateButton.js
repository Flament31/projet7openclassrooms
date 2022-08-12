import { Link } from "react-router-dom";

const UpdateButton = (id) => {

    const idPost = Object.values(id);

    return (

        <Link
            className="badge badge-warning"
            to={`/Home/UpdateArticle/${idPost}`}>
            Modifier
        </Link>
    )
};

export default UpdateButton