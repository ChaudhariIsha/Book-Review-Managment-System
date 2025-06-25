import axios from 'axios';

export function registerUser(formData){
    return axios.post("http://localhost:5000/api/auth/signup",formData);

}

export function loginUser(formData){
   
    return axios.post("http://localhost:5000/api/auth/signin",formData);
}
export function storeToken(token){
    localStorage.setItem("token",token);
}
export function getToken(){
    return localStorage.getItem("token");
}
export function removeToken(){
    return localStorage.removeItem("token");
}