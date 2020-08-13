import axios from 'axios';
import baseUrl from './config';

const api = baseUrl + '/api/persons';

const getAll = async () => {
    const res = await axios.get(api);
    return res.data;
};
const create = async (newObject) => {
    const res = await axios.post(api, newObject);
    return res.data;
};

const del = async (id) => {
    const res = await axios.delete(`${api}/${id}`);
    return res.data;
};
const update = async (id, newObject) => {
    const res = await axios.put(`${api}/${id}`, newObject);
    return res.data;
};

export default { getAll, create, update, del };
