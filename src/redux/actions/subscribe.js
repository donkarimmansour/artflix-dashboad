
import { SET_SUBSCRIBE ,GET_SUBSCRIBE, GET_COUNT_SUBSCRIBE} from "../constans/subscribe"
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE, CLEAR_MESSAGE } from "../constans/message"
import { List , ListCount } from "../../services/subscribe"
import { START_LOADING, STOP_LOADING } from "../constans/loading"


const  get_Subscribe  = (filterage,token) => {

    return dispatch => {
  
      dispatch({ type: START_LOADING });
      List(filterage,token) //hadi hia requist
        .then(({ data }) => {
          if (data.err === false) {
            dispatch({ type: STOP_LOADING });
            dispatch({
              type: GET_SUBSCRIBE,
              payload: data.msg
            });
            // console.log(data.msg);
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

  const  get_count_Subscribe  = (filterage,token) => {

    return dispatch => {
  
      dispatch({ type: START_LOADING });
      ListCount(filterage,token) //hadi hia requist
        .then(({ data }) => {
          if (data.err === false) {
            dispatch({ type: STOP_LOADING });
            dispatch({
              type: GET_COUNT_SUBSCRIBE,
              payload: data.msg
            });
            // console.log(data.msg);
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
export {
    get_Subscribe , get_count_Subscribe
}