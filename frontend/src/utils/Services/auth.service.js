import axios from "axios";

const login = (email, password) => {
    return axios
        .post("http://localhost:8000/api/auth/login", {
            email,
            password,
        })
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify(res.data));
            }

            return res.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
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