import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
}

 
const List = async (filter) => {
    return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.list}` 
    , { headers :  {...config.headers} , params : {...filter} } )
}

const ListTab = async (filter) => {
  return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.listtab}` 
  , { headers :  {...config.headers} , params : {...filter} } )
}

const ListDistinct = async (distinct) => {
  return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.distinct}` ,  { "distinct" : distinct } , config )
}

const ListCount = async (filter) => {
  return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.count}`  , { headers :  {...config.headers} , params : {...filter} } )
}

const Create = async (data , con) => {
  return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.create}` 
  , data , { headers :  {...config.headers , ...con}} )
}

const Edit = async (id , data , con) => {
  return  await  axios.put(`${Host.BACKEND}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.edit}/${id}` 
  , data , { headers :  {...config.headers , ...con}} )
}

const Duplicate = async (id  , con) => {
  return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.duplicate}/${id}` , {} , { headers :  {...config.headers , ...con}} )
}

const Delete = async (id  , con) => {
  return  await  axios.delete(`${Host.BACKEND}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.delete}/${id}`  , { headers :  {...config.headers , ...con}} )
}

const Clone = async (id  , con) => {
  return  await  axios.post(`${Host.BACKEND}${ApiEndpoints.ProductsEndpoints.route}${ApiEndpoints.ProductsEndpoints.aliexpress}/${id}` , {} , { headers :  {...config.headers , ...con}} )
}

export {
  List ,
  ListTab , 
  ListDistinct ,
  ListCount ,
  Create ,
  Edit, 
  Delete ,
  Duplicate ,
  Clone
}