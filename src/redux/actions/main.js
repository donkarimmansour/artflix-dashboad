
import { GET_MAIN , GET_COUNT_MAIN , GET_SINGLE_MAIN , DUPLICATE_MAIN , EDIT_MAIN , DELETE_MAIN ,  CREATE_MAIN  } from "../constans/main"
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from "../constans/message"
import {List , Count , Edit , Delete , Duplicate , Create } from "../../services/main"
import { START_LOADING, STOP_LOADING } from "../constans/loading"



const get_mains = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {
 
        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_MAIN,
                payload: data.msg
            })
        } else {
            dispatch({ type: STOP_LOADING })
           // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
      //    console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}

const get_count = (filter , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Count(filter , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_COUNT_MAIN,
                payload: data.msg

            })
        } else {
            dispatch({ type: STOP_LOADING })
           // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
        //  console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}

const get_single_main = (filter) => async dispatch => {
  
    dispatch({ type: START_LOADING })
    
    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_SINGLE_MAIN,
                payload: data.msg[0]

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




const create_main = (mydata , con) => async dispatch => {
    dispatch({ type: START_LOADING })

    Create(mydata , con).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: CREATE_MAIN,
                payload: {id :data.msg , data : mydata }

            }) 
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "Created" })

        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
        //  console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
} 


const edit_main = ( id , mydata , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Edit(id , mydata , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : EDIT_MAIN,
                payload: {id , data : mydata }

            })
            dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "updated" })

        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
        //  console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
} 



const duplicate_main = (mains , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Duplicate(mains._id , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : DUPLICATE_MAIN,
                payload: {mains , id : data.msg}

            })
        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
        //  console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
} 

const delete_main = ( id , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Delete(id , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : DELETE_MAIN,
                payload: id

            })
        } else {
            dispatch({ type: STOP_LOADING })
            dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
        }
        //  console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
} 




export {
    get_mains , get_single_main , get_count , edit_main  , delete_main , duplicate_main , create_main
}

