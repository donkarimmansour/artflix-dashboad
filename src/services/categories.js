import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
}


const List = async (filter) => {
    return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.CatyEndpoints.route}${ApiEndpoints.CatyEndpoints.list}` 
    , { headers :  {...config.headers} , params : {...filter} } )
}

const Count = async (filter , con) => {
  return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.CatyEndpoints.route}${ApiEndpoints.CatyEndpoints.count}` 
  , { headers :  {...config.headers , ...con} , params : {...filter} } )
}

const Create = async (data , con) => {
  return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.CatyEndpoints.route}${ApiEndpoints.CatyEndpoints.create}` 
  , data , { headers :  {...config.headers , ...con}} )
}

const Edit = async (id , data , con) => {
  return  await  axios.put(`${Host.BACKEND}${ApiEndpoints.CatyEndpoints.route}${ApiEndpoints.CatyEndpoints.edit}/${id}` 
  , data , { headers :  {...config.headers , ...con}} )
}

const Duplicate = async (id  , con) => {
  return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.CatyEndpoints.route}${ApiEndpoints.CatyEndpoints.duplicate}/${id}` , {} , { headers :  {...config.headers , ...con}} )
}

const Delete = async (id  , con) => {
  return  await  axios.delete(`${Host.BACKEND}${ApiEndpoints.CatyEndpoints.route}${ApiEndpoints.CatyEndpoints.delete}/${id}`  , { headers :  {...config.headers , ...con}} )
}


const ListTab = async (filter) => {
  return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.CatyEndpoints.route}${ApiEndpoints.CatyEndpoints.listtab}` 
  , { headers :  {...config.headers} , params : {...filter} } )
}

export {
  List ,
  ListTab ,
  Create ,
  Delete ,
  Duplicate ,
  Edit ,
  Count
} 