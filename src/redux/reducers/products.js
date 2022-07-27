import { GET_PRODUCTS, GET_SINGLE_PRODUCTS, GET_PRODUCTS_COUNT, DUPLICATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, CRAETE_PRODUCT } from "../constans/products"

const INITIAL_STATE = {
    products: [],
    singleproduct: {},
     count: 0,
}

const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case GET_SINGLE_PRODUCTS:
            return {
                ...state,
                singleproduct: action.payload
            }

        case GET_PRODUCTS_COUNT:
            return {
                ...state,
                count: action.payload
            }

            case CRAETE_PRODUCT:
                return {
                    ...state,
                    count: state.count + 1,
                    products: [...state.products, {  _id: action.payload.id , ...action.payload.data } ]
                }

            case DELETE_PRODUCT:
                const ProdDelIndex = state.products.findIndex(c => c._id === action.payload)
    
                if (ProdDelIndex !== -1) {
                    state.products.splice(ProdDelIndex, 1)
                    state.count = state.count - 1
                }
    
                return {
                    ...state,
                    products: state.products
                }
    
            case DUPLICATE_PRODUCT:
                return {
                    ...state,
                    count: state.count + 1,
                    products: [...state.products, {  ...action.payload.products , _id: action.payload.id }]
                }
    
            case EDIT_PRODUCT:
                const ProdEditIndex = state.products.findIndex(c => c._id === action.payload.id)
    
                if (ProdEditIndex !== -1)
                    state.products.splice(ProdEditIndex, 1, { ...state.products[ProdEditIndex], ...action.payload.data })
    
                return {
                    ...state,
                    products: state.products
                }

        default: return state
    }
}

export default productsReducer