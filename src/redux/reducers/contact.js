import { GET_CONTACTS, GET_COUNT_CONTACTS } from "../constans/contact";

const INITIAL_STATE = {
  Contacts: [],
  count: 0,
};
 
const contactsReducer = (state = INITIAL_STATE, action) => {
  if (action.type === GET_CONTACTS) {
    return {
      ...state , 
      Contacts: action.payload,
    };
  }else  if (action.type === GET_COUNT_CONTACTS) {
    return {
      ...state , 
      count: action.payload,
    };
  } else {
    return state;
  }
};
export default contactsReducer;