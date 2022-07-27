import { START_LOADING, STOP_LOADING } from "../constans/loading";
import { GET_CONTACTS, GET_COUNT_CONTACTS } from "../constans/contact";
import { List , ListCount } from "../../services/contact";

const  get_Contacts  = (filterage,token) => {

  return dispatch => {

    dispatch({ type: START_LOADING });
    List(filterage,token) //hadi hia requist
      .then(({ data }) => {
        if (data.err === false) {
          dispatch({ type: STOP_LOADING });
          dispatch({
            type: GET_CONTACTS,
            payload: data.msg
          }); 
        } else { 
          dispatch({ type: STOP_LOADING });
       
        }
      })
      .catch((err) => { 
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING });
      });
}
}

const  get_count_Contacts  = (filterage,token) => {

  return dispatch => {

    dispatch({ type: START_LOADING });
    ListCount(filterage,token) //hadi hia requist
      .then(({ data }) => {
        if (data.err === false) {
          dispatch({ type: STOP_LOADING });
          dispatch({
            type: GET_COUNT_CONTACTS,
            payload: data.msg
          }); 
        } else { 
          dispatch({ type: STOP_LOADING });
       
        }
      })
      .catch((err) => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING });
      });
}
}


export { get_Contacts , get_count_Contacts};
