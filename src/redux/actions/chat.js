import { getMessageApi ,getFriendsApi  ,ImageMessageSendApi , messageSendApi} from '../../services/chat';
import { START_LOADING, STOP_LOADING } from '../constans/loading';
import { SHOW_SUCCESS_MESSAGE } from '../constans/message';
import { FRIENDS_GET_SUCCESS,MESSAGE_GET_SUCCESS,MESSAGE_SEND_SUCCESS } from "../constans/chat";



 const getFriends = (authorization) => async dispatch => { 
 
    dispatch({ type: START_LOADING })

    getFriendsApi(authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : FRIENDS_GET_SUCCESS,
                payload : data.msg
            })
        } else {
            dispatch({ type: STOP_LOADING })
           // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
        // console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
    
}


const getMessage = (p , id) => async dispatch => {
 
    dispatch({ type: START_LOADING })

    getMessageApi(p , id).then(({ data }) => {

        if (data.msg === "there are no Messages" || !data.err ) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : MESSAGE_GET_SUCCESS,
                payload : data.msg === "there are no Messages" ? [] : data.msg
            })
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "getMessage" })

        } else {
            dispatch({ type: STOP_LOADING })
        }
        //  console.log("data");

    }).catch(err => {
        console.log("get orders api err ", err); 
        dispatch({ type: STOP_LOADING })
    })
    
}



 const messageSend = (data) => async dispatch => {

    dispatch({ type: START_LOADING })

    messageSendApi(data).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : MESSAGE_SEND_SUCCESS,
                payload : data.msg
            })
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "MessageSend" })

        } else {
            dispatch({ type: STOP_LOADING })
        }
      //    console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
    
}


 const ImageMessageSend = (myData) => async dispatch => {

    dispatch({ type: START_LOADING }) 

    ImageMessageSendApi(myData).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : MESSAGE_SEND_SUCCESS,
                payload :  data.msg
            })
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "MessageSend" })

        } else {
            dispatch({ type: STOP_LOADING })
        }
      //    console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
    
}



export { getMessage , getFriends , ImageMessageSend , messageSend }

