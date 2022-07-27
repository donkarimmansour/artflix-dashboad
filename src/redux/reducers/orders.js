import { GET_ORDERS, GET_ORDER, COUNT_ORDERS, STATUS_ORDERS} from "../constans/orders"

const INITIAL_STATE = {
    orders: [] ,
    order : {} ,
    count : 0 ,
}

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case GET_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case COUNT_ORDERS:
            return {
                ...state,
                count: action.payload
            }
        case STATUS_ORDERS:

            const orderIndex = state.orders.findIndex(o => o._id === action.payload.orderId)

            if (orderIndex !== -1) {
                const producIndex = state.orders[orderIndex].orders.findIndex(p => p.productId === action.payload.productId)

                if (producIndex !== -1) {
                    state.orders[orderIndex].orders[producIndex].status = action.payload.status

                }
            }
           

            return {
                ...state,
                orders: state.orders
            }
        default: return state
    }
}

export default ordersReducer