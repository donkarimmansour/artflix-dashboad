import Users from "../../components/user/users";
import {
  ADD_USER,
  COUNT_USER,
  GET_USERS,
  UPDATE_USER_SUSPENDED,
  EDIT_USER,
  VERIFIED_USER,
  GET_USER,
  EDIT_RULE,
} from "../constans/users";

const INITIAL_STATE = {
  Users: [],
  User: {},
  count: 0,
};
//{...m , n : "rrr"} ghakhli lia dik m kifma hia otmchi nichan n lildakhl

const userReducer = (state = INITIAL_STATE, action) => {
  if (action.type === GET_USERS) {
    return {
      ...state,
      Users: action.payload,
    };
  } else if (action.type === GET_USER) {
    return {
      ...state,
      User: action.payload,
    };
  } else if (action.type === ADD_USER) {
    return {
      ...state,
      count: state.count + 1,
      Users: [action.payload, ...state.Users],
    };
  } else if (action.type === EDIT_USER) {
    const suspendIndex = state.Users.findIndex(
      (u) => u._id === action.payload.id
    );
    if (suspendIndex !== -1) {
      state.Users.splice(suspendIndex , 1 , {...state.Users[suspendIndex] ,  ...action.payload.data})
      state.User = {...state.Users[suspendIndex] ,  ...action.payload.data}

    }
    return {
      ...state,
      Users: state.Users,
      User: state.User,
    };
  }else if (action.type === EDIT_RULE) {
    const ruleIndex = state.Users.findIndex(
      (u) => u._id === action.payload.id
    );
    if (ruleIndex !== -1) {
      state.Users[ruleIndex].rule = action.payload.data.rule
    }
    return {
      ...state,
      Users: state.Users,
      User: state.User,
    };
  }  else if (action.type === UPDATE_USER_SUSPENDED) {
    // console.log(action.payload);
    // let suspendIndex = -1;
    // for (let index = 0; index < state.Users.length; index++) {
    //   if(state.Users[index]._id === action.payload.id){
    //      suspendIndex = index
    //   }
    // }
    const suspendIndex = state.Users.findIndex(
      (u) => u._id === action.payload.id
    );
    if (suspendIndex !== -1) {
      state.Users[suspendIndex].isAccountSuspended =
        action.payload.data.isAccountSuspended;
    }
    return {
      ...state,
      Users: state.Users,
    };
  } else if (action.type === VERIFIED_USER) {
    const confirmIndex = state.Users.findIndex((u) => u._id === action.payload);
    if (confirmIndex !== -1) {
      state.Users[confirmIndex].isEmailVerified = true;
    }
    return {
      ...state,
      Users: state.Users,
    };
  } else if (action.type === COUNT_USER) {
    return {
      ...state,
      count: action.payload,
    };
  } else {
    return state;
  }
};
export default userReducer;