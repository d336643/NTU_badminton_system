import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});
instance.interceptors.response.use(
    res => res,
    err =>  {
        throw new Error(err.response.data.msg);
    }
)
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// instance.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

// instance.interceptors.request.use(
//     (config) => {
//         // get token from local storage
//         const token = localStorage.getItem('token');
        
//         if(token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (err) => Promise.reject(err)
// )

export default instance;
