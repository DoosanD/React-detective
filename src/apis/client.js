import axios from 'axios';
import jwtDecode from 'jwt-decode';

function isTokenExpired(token) {
    var decoded = jwtDecode(token)

    if (decoded.exp < Date.now() / 1000) {
        return true
    } else {
        return false
    }
}


const instance = axios.create({
    // baseURL: 'https://sudije.herokuapp.com/',
    //baseURL: 'http://localhost:8000/',
    baseURL: 'https://preqbackend.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        console.log(err)
        const originalConfig = err.config;


        if (originalConfig.url !== '/auth/jwt/create/' && err.response) {
            //access token expored!!
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const r = localStorage.getItem('refreshToken')
                    if (!isTokenExpired(r)) {
                        const rs = await instance.post('auth/jwt/refresh/', {
                            refresh: localStorage.getItem('refreshToken'),
                        })
                        localStorage.setItem('token', rs.data.access);

                        return instance(originalConfig);
                    } else {
                        localStorage.setItem('refreshToken', null)
                        localStorage.setItem('token', null)

                    }

                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

export default instance;

