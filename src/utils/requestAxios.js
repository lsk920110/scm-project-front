import axios from "axios";


const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  timeout: 30000,
});

service.defaults.headers = {
  "Content-Type": "application/json;charset=utf-8",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};



service.interceptors.request.use(
  (config) => {
    config.data = {
      ...config.data,
      
    }
    console.log('headers before : ',config.headers);
    config.headers = {
      ...config.headers,
      'auth-token' : localStorage.getItem('auth-token')
    }
    return config;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    console.log(response.data)
    const {errorCode , errorMessage} = response.data
    if(errorCode === '0301' || errorCode === '0302' || errorCode === '0303')
    {
      alert('axios interceptor : '+errorMessage)
      window.location.href = '/login'
      return;
    } else {
      return Promise.resolve(response);
    }

  },
  async (error) => {
    return Promise.reject(error);
  }
);


export default service