import axios from 'axios'

import { Alert } from 'react-bootstrap';
import AuthService from "../../services/login/auth.service";
 
const api = axios.create({
  baseURL: 'https://api-node-crud-teste.herokuapp.com',
 
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.response.use(
  response => {

  

    return response
  },
  error => {

      if (
      error.request._hasError === true &&
      error.request._response.includes('connect')
    ) {
      Alert.alert(
        'Aviso',
        'Não foi possível conectar aos nossos servidores, sem conexão a internet',
        [ { text: 'OK' } ],
        { cancelable: false },
      )
    }

    if (error.response.status === 401) {
      const requestConfig = error.config

      AuthService.logout();
      this.props.history.push("/home");
      window.location.reload();

      return axios(requestConfig)
    }

    return Promise.reject(error)
  },
)
api.interceptors.request.use(
  config => {

    const user = JSON.parse(localStorage.getItem('user'));
 
    if (user && user.token) {
            
      const token =user.token;
   
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
      }
     
      }
      return config;
      
  },
  error => {
      Promise.reject(error)
  });


export default api
