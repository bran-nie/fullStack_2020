import axios from 'axios';
import baseUrl from './config';

const api = baseUrl + '/api/notes';

const getAll = async () => {
    const res = await axios.get(api);
    return res.data;
};
const create = (newObject) => {
    return axios.post(api, newObject);
};

const update = (id, newObject) => {
    return axios.put(`${api}/${id}`, newObject);
};

export default { getAll, create, update };
