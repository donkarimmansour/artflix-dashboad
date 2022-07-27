import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    Headers : {
       "Content-Type" : "application/json" 
    } 
    
}
const SignupAuth = async (data) => {
 return  await axios.post(`${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.signup}` , data , config)
}


const LoginAuth = async (data) => {
    return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.AdminEndpoints.route}${ApiEndpoints.AdminEndpoints.login}` , data , config)
}

const ForgotAuth = async (data) => {
    return  await  axios.put(`${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.forgot}` , data , config)
}

const ConfirmEmailAuth = async (id) => {
    return  await  axios.put(`${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.confirm}/${id}`, config)
}

const Me = async (token) => {
    return await axios.get(
      `${Host.BACKEND}${ApiEndpoints.AuthEndpoints.route}${ApiEndpoints.AuthEndpoints.me}`,
      { headers: { ...config.headers, ...token } }
    );
  };
  

export {SignupAuth , LoginAuth , ForgotAuth , ConfirmEmailAuth , Me}


