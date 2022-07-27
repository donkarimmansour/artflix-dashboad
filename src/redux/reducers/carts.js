import { setLocalStorage } from "../../shared/localStorage"
import { GET_CARTS, SET_CARTS, DELETE_CARTS, DECREASE_CARTS, INCREASE_CARTS, COLOR_CARTS , SIZE_CARTS, DELETE_CART } from "../constans/carts"

const INITIAL_STATE = {
    carts: []
}

const cartsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CARTS:
            return {
                carts: action.payload
            }
        case SET_CARTS:
            return {
                carts: action.payload
            }
        case DELETE_CARTS:
            const newCart = state.carts.filter(o => o.product._id !== action.payload.id)
            console.log(newCart);
            setLocalStorage("cart" , newCart)

            return {
                carts: [...newCart]
            }
        case DELETE_CART:
            return {
                carts:[]
            }
        case INCREASE_CARTS:
            const indexI = state.carts.findIndex(o => o.product._id == action.payload.id);  
            state.carts[indexI]["quantity"] += 1
            state.carts[indexI]["amount"] = (state.carts[indexI]["price"] * state.carts[indexI]["quantity"])
            setLocalStorage("cart" , state.carts)

            return {
                carts: [...state.carts]
            }
        case DECREASE_CARTS:
            const indexD = state.carts.findIndex(o => o.product._id == action.payload.id);
            if (state.carts[indexD]["quantity"] > 1) {
                state.carts[indexD]["quantity"] -= 1
                state.carts[indexD]["amount"] = (state.carts[indexD]["price"] * state.carts[indexD]["quantity"])
                setLocalStorage("cart", state.carts)
            }

            return {
                carts: [...state.carts]
            }

        case COLOR_CARTS:
          
            return {
                carts: action.payload
            }

        case SIZE_CARTS:

            return {
                carts: action.payload
            }
        default: return state
    }
}

export default cartsReducer