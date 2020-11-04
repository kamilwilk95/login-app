import axios from 'axios';

axios.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    return config;
});

export class ApiUrlBuilder {
    static getBaseUrl(domain: string) {
        return `/api/${domain}`;
    }
}