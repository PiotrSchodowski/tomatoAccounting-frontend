import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const register = (email, password) => {
  return axios.post(API_URL + "register", {
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

/* const logout = () => {            najpierw zrobic backend
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
}; */

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  getCurrentUser,
};

export default AuthService;
