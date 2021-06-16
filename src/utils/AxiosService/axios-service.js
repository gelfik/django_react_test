import axios from "axios";
// baseURL: 'https://myherokuspp.herokuapp.com/https://busservice.gelfik.dev/api'

const initAxios = (tokenStore) => {
    const $axios = axios.create({
        baseURL: 'https://busservice.gelfik.dev/api'
    })
    $axios.defaults.headers.post['Content-Type'] = 'application/json';
    $axios.defaults.headers.put['Content-Type'] = 'multipart/form-data';
    $axios.defaults.headers.patch['Content-Type'] = 'application/json';

    $axios.interceptors.request.use(function (config) {
        const token = tokenStore.token;
        if (token?.value) {
            config.headers.Authorization = token.value;
        }
        return config
    }, (err) => {
        console.error(err)
    });
    return $axios;
}

export default initAxios;