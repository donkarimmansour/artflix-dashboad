import { GET_COUNT_SUBSCRIBE, GET_SUBSCRIBE } from "../constans/subscribe";


const INITIAL_STATE = {
    Sub: [],
    count : 0
};

const subscribeReducer = (state = INITIAL_STATE, action) => {
  if (action.type === GET_SUBSCRIBE) {
    return {
      ...state , 
      Sub: action.payload,
    };
  }else  if (action.type === GET_COUNT_SUBSCRIBE) {
    return {
      ...state , 
      count: action.payload,
    };
  } else {
    return state;
  }
};
export default subscribeReducer;