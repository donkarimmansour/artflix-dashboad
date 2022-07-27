import { GET_MAIN , GET_COUNT_MAIN , GET_SINGLE_MAIN , DUPLICATE_MAIN , EDIT_MAIN , DELETE_MAIN ,  CREATE_MAIN  } from "../constans/main"

const INITIAL_STATE = {
    main: [] ,
    singlemain: {},
    count: 0,
} 

const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MAIN:

            return {
                ...state,
                main: action.payload
            }

            case GET_SINGLE_MAIN:
                return {
                    ...state,
                    singlemain: action.payload
                }
    
            case GET_COUNT_MAIN:
                return {
                    ...state,
                    count: action.payload
                }
    
                case CREATE_MAIN:
                    return {
                        ...state,
                        count: state.count + 1,
                        main: [...state.main, {  _id: action.payload.id , ...action.payload.data } ]
                    }
    
                case DELETE_MAIN:
                    const MainDelIndex = state.main.findIndex(c => c._id === action.payload)
        
                    if (MainDelIndex !== -1) {
                        state.main.splice(MainDelIndex, 1)
                        state.count = state.count - 1
                    }
        
                    return {
                        ...state,
                        main: state.main
                    }
        
                case DUPLICATE_MAIN:
                    return {
                        ...state,
                        count: state.count + 1,
                        main: [...state.main, {  ...action.payload.mains , _id: action.payload.id }]
                    }
        
                case EDIT_MAIN:
                    const MainEditIndex = state.main.findIndex(c => c._id === action.payload.id)
        
                    if (MainEditIndex !== -1)
                        state.main.splice(MainEditIndex, 1, { ...state.main[MainEditIndex], ...action.payload.data })
        
                    return {
                        ...state,
                        main: state.main
                    }
    
        default: return state
    }
}

export default mainReducer 