import { Link } from 'react-router-dom'

const Post = () => {
    return (
        <div>
            <button><Link className="nav-link" to="/newPost">Créer une publication</Link></button>
        </div>
    );
}

export default Post