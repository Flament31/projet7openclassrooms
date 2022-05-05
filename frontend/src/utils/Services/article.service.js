import axios from "axios";

const getAll = () => {
    return axios.get(`http://localhost:8000/api/post/`, {
        headers: {
            "Content-type": "application/json"
        }
    });
};

const ArticleService = {
    getAll
};

export default ArticleService;