import axios from 'axios';
import { useEffect, useState } from 'react';
import ArticlesCard from './ArticlesCard';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {

        let cancel = true;

        axios
            .get(`http://localhost:8000/api/post/`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                if (cancel) {
                    setPosts(res.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        return () => {
            cancel = false;
        }
    }, [token]);

    return (
        <div>
            <ul>
                <li>
                    <div>
                        {posts?.map((post, index) => (
                            <ArticlesCard
                                key={`${post.id}-${index}`}
                                title={post.title}
                                text={post.text}
                                imageUrl={post.imageUrl}
                            />
                        ))}
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Post;