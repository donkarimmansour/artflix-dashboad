
import {LOGOUT , TOKEN , ME , ISAUTH} from "../constans/auth"
import { START_LOADING, STOP_LOADING } from "../constans/loading"
import {  LoginAuth, Me as LogMe} from "../../services/auth"
import { CLEAR_MESSAGE, SHOW_ERROR_MESSAGE } from "../constans/message"


const Auth = (formData) => async dispatch => {

    dispatch({ type: START_LOADING })

    LoginAuth(formData).then(({ data }) => {
 
        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: TOKEN , payload : data.msg.TOKEN
            })

            dispatch(Me({ "Authorization": `bearer ${data.msg.TOKEN}` }))
        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload : data.msg })
        }


    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload : "something went wrong please try again" })
    })
}





const Me = (token) => async dispatch => {

    dispatch({ type: START_LOADING })

    LogMe(token).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: ME , payload : data.msg
            })
            dispatch({ type: CLEAR_MESSAGE })

        } else {
            dispatch({type: LOGOUT })
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload : data.msg })
        }


    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({type: LOGOUT })
        dispatch({ type: STOP_LOADING })
    })
}



const Logout = (next) => async dispatch => {

    dispatch({ type: START_LOADING })
    dispatch({type: LOGOUT })
    dispatch({ type: STOP_LOADING })
    
    next() ;

}

const isAuthentication = () => async dispatch => {

    dispatch({ type: START_LOADING })
    dispatch({type: ISAUTH })
    dispatch({ type: STOP_LOADING })
    
}


export {
     Logout , Me , Auth , isAuthentication
}

 