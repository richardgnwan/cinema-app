// Axios Instance for Customization Purposes
import axios from "axios";

export const axiosBackend = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  withCredentials: true,
});