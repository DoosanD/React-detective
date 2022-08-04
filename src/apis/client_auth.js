import axios from 'axios';

export default axios.create({
    baseURL: 'https://preqbackend.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});
