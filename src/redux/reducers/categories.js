import { GET_MAIN_CATEGORIES, GET_SUB_CATEGORIES, CREATE_MAIN_CATEGORY, CREATE_SUB_CATEGORY, DELETE_SUB_CATEGORY, DELETE_MAIN_CATEGORY, DUPLICATE_MAIN_CATEGORY, EDIT_MAIN_CATEGORY, GET_CATEGORY, COUNT_MAIN_CATEGORY, COUNT_SUB_CATEGORY, DUPLICATE_SUB_CATEGORY, EDIT_SUB_CATEGORY, GET_SUB_CATEGORIES_PARENTS } from "../constans/categories"

const INITIAL_STATE = {
    main_categories: [],
    main_count: 0,
    sub_categories: [],
    sub_parents_categories: [],
    sub_count: 0,
    category: {},
}

const categoriesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }

        case GET_MAIN_CATEGORIES:
            return {
                ...state,
                main_categories: action.payload
            }
        case COUNT_MAIN_CATEGORY:
            return {
                ...state,
                main_count: action.payload
            }
        case CREATE_MAIN_CATEGORY:
            return {
                ...state,
                sub_count: state.sub_count + 1,
                main_categories: [...state.main_categories, {  _id: action.payload.id , categories: [] , name: [action.payload.data.name]}]
            }

        case DELETE_MAIN_CATEGORY:
            const MainDelIndex = state.main_categories.findIndex(c => c._id === action.payload)

            if (MainDelIndex !== -1) {
                state.main_categories.splice(MainDelIndex, 1)
                state.sub_count = state.sub_count - 1
            }

            return {
                ...state,
                main_categories: state.main_categories
            }

        case DUPLICATE_MAIN_CATEGORY:
            return {
                ...state,
                sub_count: state.sub_count + 1,
                main_categories: [...state.main_categories, { ...action.payload.category, _id: action.payload.id, categories: [] }]
            }

        case EDIT_MAIN_CATEGORY:
            const MainEditIndex = state.main_categories.findIndex(c => c._id === action.payload.id)

            if (MainEditIndex !== -1)
                state.main_categories.splice(MainEditIndex, 1, { ...state.main_categories[MainEditIndex], name: [action.payload.data.name] })

            return {
                ...state,
                main_categories: state.main_categories
            }



        //////////////////////SUB>>>>>>>>>>>>///////////////////////////////////


        case GET_SUB_CATEGORIES:
            return {
                ...state,
                sub_categories: action.payload
            }

        case GET_SUB_CATEGORIES_PARENTS:
            return {
                ...state,
                sub_parents_categories: action.payload
            }
        case COUNT_SUB_CATEGORY:
            return {
                ...state,
                sub_count: action.payload
            }
        case CREATE_SUB_CATEGORY:
            return {
                ...state,
                main_count: state.main_count + 1,
                sub_categories: [...state.sub_categories, { ...action.payload.data, _id: action.payload.id}]
            }

        case DELETE_SUB_CATEGORY:
            const SubDelIndex = state.sub_categories.findIndex(c => c._id === action.payload)

            if (SubDelIndex !== -1) {
                state.sub_categories.splice(SubDelIndex, 1)
                state.main_count = state.main_count - 1
            }


            return {
                ...state,
                sub_categories: state.sub_categories
            }

        case DUPLICATE_SUB_CATEGORY:
            return {
                ...state,
                main_count: state.main_count + 1,
                sub_categories: [...state.sub_categories, { ...action.payload.category, _id: action.payload.id }]
            }

        case EDIT_SUB_CATEGORY:
            const SubEditIndex = state.sub_categories.findIndex(c => c._id === action.payload.id)

            if (SubEditIndex !== -1)
                state.sub_categories.splice(SubEditIndex, 1, { ...state.sub_categories[SubEditIndex], name: [action.payload.data.name] })

            return {
                ...state,
                sub_categories: state.sub_categories
            }




        default: return state
    }
}

export default categoriesReducer