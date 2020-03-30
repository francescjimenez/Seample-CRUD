import axios from 'axios';

const API_URL = process.env.URL_API || 'http://localhost:3001/api/';

let service = axios.create({
    headers: {
        csrf: 'token'
    }
});

const handleSuccess = (response) => {
    return response;
};

const redirectTo = (document, path) => {
    document.location = path
};

const handleError = (error) => {
    switch (error.response.status) {
        case 401:
            console.error('Status error: 401');
            redirectTo(document, '/');
            break;
        case 404:
            console.error('Status error: 404');
            redirectTo(document, '/');
            break;
        default:
            console.error('Status error');
            redirectTo(document, '/');
            break;
    }
    return Promise.reject(error)
};

service.interceptors.response.use(handleSuccess, handleError);

const get = (path ) => {
    return service.get(API_URL + path)
};

const patch = (path, payload) => {
    return service.request({
        method: 'PATCH',
        url: API_URL + path,
        responseType: 'json',
        data: payload
    });
};

const post = (path, payload) => {
    return service.request({
        method: 'POST',
        url: API_URL + path,
        responseType: 'json',
        data: payload
    });
};

const remove = (path, id) => {
    return service.delete(API_URL + path + '/' + id);
};


const ApiService = {
    get,
    patch,
    post,
    remove
};



export default ApiService;