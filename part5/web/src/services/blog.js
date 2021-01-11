import axios from 'axios';
import baseUrl from './config';

const api = baseUrl + '/api/blogs';

const token = localStorage.getItem('token') || '';
const config = {
    headers: { Authorization: `bearer ${token}` },
};

const getAll = async () => {
    const res = await axios.get(api);
    return res.data;
};
const create = async (newObject) => {
    const res = await axios.post(api, newObject, config);
    return res.data;
};

const update = async (id, newObject) => {
    const res = await axios.put(`${api}/${id}`, newObject);
    return res.data;
};

const deleteBlog = async (id) => {
    const res = await axios.delete(`${api}/${id}`, config);
    return res.data;
};

export default { getAll, create, update, deleteBlog };
