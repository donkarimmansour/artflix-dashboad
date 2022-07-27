import { ListTab , Create , List, Edit, Duplicate , Delete , Count} from "../../services/categories"
import { START_LOADING, STOP_LOADING } from "../constans/loading"
import { SHOW_ERROR_MESSAGE } from "../constans/message"


const get_category = (type , filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type,
                payload: data.msg[0]

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

const get_main_categories = (type , filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    ListTab(filter).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type,
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

const get_sub_categories = (type , filter) => async dispatch => {
    dispatch({ type: START_LOADING })

    List(filter).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type,
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


const count_categories = (type , filter , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Count(filter , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type,
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


const create_category = (type , mydata , con) => async dispatch => {
    dispatch({ type: START_LOADING })

    Create(mydata , con).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type,
                payload: {id :data.msg , data : mydata }

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


const edit_category = (type ,  id , mydata , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Edit(id , mydata , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type,
                payload: {id , data : mydata }

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



const duplicate_category = (type , category , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Duplicate(category._id , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type,
                payload: {category , id : data.msg}

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

const delete_category = (type , id , authorization) => async dispatch => {
    dispatch({ type: START_LOADING })

    Delete(id , authorization).then(({ data }) => {

        if (!data.err) { 
            dispatch({ type: STOP_LOADING })
            dispatch({
                type,
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
    get_sub_categories , create_category , duplicate_category ,
     edit_category , delete_category , get_category , 
     count_categories , get_main_categories
}

