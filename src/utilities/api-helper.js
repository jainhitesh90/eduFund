import axios from 'axios';
import Utililty from './utility';

const baseUrl = 'http://localhost:8080';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': Utililty.retrieveToken()
}

const getData = async function get(url) {
    return await axios.get(baseUrl + url, { headers })
        .then(result => { return result })
        .catch(error => { return Promise.reject(error); });
}

const postData = async function post(url, payload) {
    return await axios.post(baseUrl + url, payload, { headers })
        .then(result => { return result })
        .catch(error => { return Promise.reject(error); });
}

export default {
    getData, postData
};
