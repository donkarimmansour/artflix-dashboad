
import { GET_PRODUCTS , GET_SINGLE_PRODUCTS , GET_PRODUCTS_COUNT, CRAETE_PRODUCT, EDIT_PRODUCT, DUPLICATE_PRODUCT, DELETE_PRODUCT  } from "../constans/products"

import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from "../constans/message"
import { List , ListCount, Create , Delete , Duplicate , Edit} from "../../services/products"
import { START_LOADING, STOP_LOADING } from "../constans/loading"

const get_products = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {
 
        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_PRODUCTS,
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

const get_count = (filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    ListCount(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_PRODUCTS_COUNT,
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

const get_single_product = (filter) => async dispatch => {
  
    dispatch({ type: START_LOADING })
    
    List(filter).then(({ data }) => {

        if (!data.err) {
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: GET_SINGLE_PRODUCTS,
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




const create_product = (mydata , con) => async dispatch => {
    dispatch({ type: START_LOADING })

    Create(mydata , con).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type: CRAETE_PRODUCT,
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


const edit_product = ( id , mydata , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Edit(id , mydata , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : EDIT_PRODUCT,
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



const duplicate_product = (products , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Duplicate(products._id , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : DUPLICATE_PRODUCT,
                payload: {products , id : data.msg}

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

const delete_product = ( id , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Delete(id , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type : DELETE_PRODUCT,
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
    get_products , get_single_product , get_count , delete_product , duplicate_product , edit_product , create_product
}

