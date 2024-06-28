import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },

  (error) => {
    return error;
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    return error;
  },
);

export default instance;
