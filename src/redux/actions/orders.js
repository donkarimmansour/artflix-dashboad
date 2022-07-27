
import { GET_ORDERS , GET_ORDER, COUNT_ORDERS, STATUS_ORDERS } from "../constans/orders"
import { SHOW_ERROR_MESSAGE} from "../constans/message"
import { List, ListCount, Status } from "../../services/orders"
import { START_LOADING, STOP_LOADING } from "../constans/loading"

const get_orders = (filter , authorization) => async dispatch => {

    dispatch({ type: START_LOADING })
    await List( filter , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_ORDERS,
                payload: data.msg
            })
        } else {
            dispatch({ type: STOP_LOADING })
        }
       //   console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


const get_order = (filter , authorization) => async dispatch => {

    dispatch({ type: START_LOADING })
    await List( filter , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_ORDER,
                payload: data.msg[0]
            })
        } else {
            dispatch({ type: STOP_LOADING })
        }
       //   console.log(data);

    }).catch(err => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING })
    })
}


const get_count = (filter , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    ListCount(filter , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: COUNT_ORDERS,
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


const set_status = (mydata , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Status(mydata , authorization).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: STATUS_ORDERS,
                payload: mydata

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

export {
    get_orders, get_count  , set_status  , get_order
}

