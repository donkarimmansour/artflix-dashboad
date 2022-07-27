import axios from "axios"
import { ApiEndpoints, Host } from "../common/apiEndPoints"

const config = {
    Headers : {
       "Content-Type" : "application/json" 
    } 
    
}


const messageSendApi = async (data) => {
    return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.ChatEndpoints.route}${ApiEndpoints.ChatEndpoints.sendMessage}` , data , config)
}

const ImageMessageSendApi = async (data) => {
    return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.ChatEndpoints.route}${ApiEndpoints.ChatEndpoints.imageMessageSend}` , data , config)
}


const getFriendsApi = async (authorization) => {
    return await axios.get(
      `${Host.BACKEND}${ApiEndpoints.ChatEndpoints.route}${ApiEndpoints.ChatEndpoints.getFriends}`, { headers: { ...config.headers , ...authorization } }
    );
};

const getMessageApi = async (p , id) => {
    return await axios.get(
      `${Host.BACKEND}${ApiEndpoints.ChatEndpoints.route}${ApiEndpoints.ChatEndpoints.getMessage}/${p}/${id}`, { headers: { ...config.headers } }
    );
};
  
 
export { getMessageApi , getFriendsApi , ImageMessageSendApi , messageSendApi }


