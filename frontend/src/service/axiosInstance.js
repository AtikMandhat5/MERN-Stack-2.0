import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3006", //loca from env
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    // 'Authorization': 'Bearer yourToken' 
  }
});

export default axiosInstance;