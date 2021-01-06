import axios from 'axios';
import baseUrl from './config';

const api = baseUrl + '/api/notes';

const token = localStorage.getItem('token') || '';
const config = {
    headers: { Authorization: `bearer ${token}` },
};

const getAll = async () => {
    const res = await axios.get(api);
    return res.data;
};
const create = (newObject) => {
    return axios.post(api, newObject, config);
};

const update = (id, newObject) => {
    return axios.put(`${api}/${id}`, newObject);
};

export default { getAll, create, update };
