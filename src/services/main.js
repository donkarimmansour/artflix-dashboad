import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
} 


const List = async (filter) => {
  return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.MainEndpoints.route}${ApiEndpoints.MainEndpoints.list}` 
  , { headers :  {...config.headers} , params : {...filter} } )
}

const Count = async (filter , con) => {
return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.MainEndpoints.route}${ApiEndpoints.MainEndpoints.count}` 
, { headers :  {...config.headers , ...con} , params : {...filter} } )
}

const Create = async (data , con) => {
return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.MainEndpoints.route}${ApiEndpoints.MainEndpoints.create}` 
, data , { headers :  {...config.headers , ...con}} )
}

const Edit = async (id , data , con) => {
return  await  axios.put(`${Host.BACKEND}${ApiEndpoints.MainEndpoints.route}${ApiEndpoints.MainEndpoints.edit}/${id}` 
, data , { headers :  {...config.headers , ...con}} )
}

const Duplicate = async (id  , con) => {
return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.MainEndpoints.route}${ApiEndpoints.MainEndpoints.duplicate}/${id}` , {} , { headers :  {...config.headers , ...con}} )
}

const Delete = async (id  , con) => {
return  await  axios.delete(`${Host.BACKEND}${ApiEndpoints.MainEndpoints.route}${ApiEndpoints.MainEndpoints.delete}/${id}`  , { headers :  {...config.headers , ...con}} )
}




export {
  List , Count , Edit , Delete , Duplicate , Create
}