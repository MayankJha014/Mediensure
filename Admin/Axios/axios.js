import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_SERVER,
  withCredentials: true,
});

export default instance;
