import axios from "axios";

const login = (email, password) => {
    return axios
        .post("http://localhost:8000/api/auth/login", {
            email,
            password,
            headers: { "Content-Type": "application/json", },
        })
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data));
                localStorage.setItem('token', JSON.stringify(res.data));
                localStorage.setItem("idUser", JSON.stringify(res.data.idUser));
            }

            return res.data;
        });
};

const logout = () => {
    localStorage.clear();
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
};

export default AuthService;