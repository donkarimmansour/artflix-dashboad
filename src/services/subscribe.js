import axios from "axios"
import {Host , ApiEndpoints} from "../common/apiEndPoints"

const config = {
    headers : {
       "Content-Type" : "application/json" 
    }  
}

 
const List = async (filter , con) => {
  return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.SubscribeEndpoints.route}${ApiEndpoints.SubscribeEndpoints.list}` 
  , { headers :  {...config.headers , ...con} , params : {...filter} } )
}


const ListCount = async (filter, con) => {
  return  await  axios.get(`${Host.BACKEND}${ApiEndpoints.SubscribeEndpoints.route}${ApiEndpoints.SubscribeEndpoints.count}`  , { headers :  {...config.headers , ...con} , params : {...filter} } )
}



export {
 List , ListCount
}