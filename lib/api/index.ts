import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.NEXTAUTH_URL,
});

export default axios;