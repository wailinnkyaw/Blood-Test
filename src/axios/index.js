import axios from "axios";

const instance = axios.create({
    baseURL: 'http://192.168.43.43/api'
});

export default instance;