import axios from 'axios';
import { useEffect, useState } from 'react';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/post/`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setPosts(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token]);

    const id = JSON.parse(localStorage.getItem('user')).idUser;
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/auth/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id, token]);

    return (
        <div>
            <ul>
                {posts.map((item) => {
                    return (
                        <li key={item.idPost}>
                            <div>

                                <div>
                                    <div>
                                        <p>
                                            {item['user.name']}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p>
                                        {item.title}
                                    </p>
                                    <p>
                                        {item.text}
                                    </p>
                                    <div>
                                        {item.imageUrl ? (
                                            <img
                                                className="m-auto"
                                                alt="post"
                                                src={item.imageUrl}
                                            ></img>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Post;