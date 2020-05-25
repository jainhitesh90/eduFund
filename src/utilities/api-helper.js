import axios from 'axios';
import Utililty from './utility';

const baseUrl = 'http://localhost:8080';

const getData = async function get(url) {
    const headers = {
        'Authorization': Utililty.retrieveToken()
    }
    return await axios.get(baseUrl + url, { headers })
        .then(result => { return result })
        .catch(error => { return error.response; });
}

const postData = async function post(url, payload) {
    const headers = {
        'Authorization': Utililty.retrieveToken()
    }
    return await axios.post(baseUrl + url, payload, { headers })
        .then(result => { return result })
        .catch(error => { return Promise.reject(error); });
}

export default {
    getData, postData
};
