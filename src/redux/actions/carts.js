
import { GET_CARTS , SET_CARTS , DELETE_CARTS , DECREASE_CARTS , INCREASE_CARTS  , COLOR_CARTS , SIZE_CARTS } from "../constans/carts"
import { SHOW_ERROR_MESSAGE } from "../constans/message"
import { START_LOADING, STOP_LOADING } from "../constans/loading"
import { getLocalStorage, setLocalStorage } from "../../shared/localStorage"


const get_carts = () => async dispatch => {
    dispatch({ type: START_LOADING })

    try {
        const cart = localStorage.getItem("cart") ?  getLocalStorage("cart") : [] 
         
        dispatch({
            type: GET_CARTS,
            payload: cart
        })
    
        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }

   

}

const create_carts = (product) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

        const cart =  localStorage.getItem("cart") ? getLocalStorage("cart") : [] 
        const index = cart.findIndex(c => c.product._id === product._id)
         
        if(index > -1){
             cart[index].quantity += 1
             cart[index].color = product.color[0]
             cart[index].size = product.size[0].size
             cart[index].amount = (product.price * cart[index].quantity)
        }else {
             cart.push({product , quantity : 1 , size : product.size[0].size , color : product.color[0] , amount : product.price , price : product.price})
        }
    
        dispatch({
            type: SET_CARTS,
            payload: cart
        })

        setLocalStorage("cart" , cart)

        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }

}

const increase_carts = (id) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

        dispatch({
            type: INCREASE_CARTS,
            payload: {id}
        })
    
        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }

   

}

const decrease_carts = (id) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

    
        dispatch({
            type: DECREASE_CARTS,
            payload: {id}
        })
    
        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }

   

}



const delete_carts = (id) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

        dispatch({
            type: DELETE_CARTS,
            payload: {id}
        })
    
        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }
}


const size_carts = (id , size , price) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

        const cart =  localStorage.getItem("cart") ? getLocalStorage("cart") : [] 
        const index = cart.findIndex(c => c.product._id === id)
    
    
        if(index => 0){ 
            cart[index].size = size
            cart[index].price = price
            cart[index].amount = (price * cart[index].quantity)
        }
    
        dispatch({
            type: SIZE_CARTS,
            payload: cart
        })
        setLocalStorage("cart" , cart)

        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }
}



const color_carts = (id , color) => async dispatch => {
    dispatch({ type: START_LOADING })

    try {

        const cart =  localStorage.getItem("cart") ? getLocalStorage("cart") : [] 
        const index = cart.findIndex(c => c.product._id === id)
    
    
        if(index => 0){
             cart[index].color = color
        }
    
        dispatch({
            type: COLOR_CARTS,
            payload: cart
        })
        setLocalStorage("cart" , cart)

        dispatch({ type: STOP_LOADING })
    }catch(err){
        console.log("set carts api err ", err);
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err })
        dispatch({ type: STOP_LOADING })
    }
}



export {
    get_carts, create_carts , increase_carts , decrease_carts , color_carts , size_carts , delete_carts
}

