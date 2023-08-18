import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

const getCommonConfig = (requiresToken = true) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    };
    
    if (requiresToken) {
      const token = localStorage.getItem('token');
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
};

instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      
      // Check if the request requires a token
      if (token && config.headers.requiresToken) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      
      return config;
    },
    (err) => Promise.reject(err)
  );
  
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
        throw new Error(err.response.data.msg);
    }
  );
  
  export { instance, getCommonConfig };
