import axios from 'axios';
import Utililty from './utility';

const getData = async function get(url) {
    const headers = {
        'Authorization': Utililty.retrieveToken()
    }
    return await axios.get(url, { headers })
        .then(result => { return result })
        .catch(error => { return error.response });
}

const postData = async function post(url, payload) {
    const headers = {
        'Authorization': Utililty.retrieveToken()
    }
    return await axios.post(url, payload, { headers })
        .then(result => { return result })
        .catch(error => { return error.response });
}

export default {
    getData, postData
};
