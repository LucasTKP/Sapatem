import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
  timeout: 1000,
});
