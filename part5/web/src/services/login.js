import axios from 'axios';
import baseUrl from './config';

const login = async (credentials) => {
    const res = await axios.post(`${baseUrl}/api/login`, credentials);
    return res.data;
};

export default { login };
