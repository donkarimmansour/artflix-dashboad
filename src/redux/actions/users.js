import { START_LOADING, STOP_LOADING } from "../constans/loading";
import {
  CLEAR_MESSAGE,
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../constans/message";
import {
  Count,
  Create,
  EditRule,
  EditUser,
  Image,
  List,
  Suspended,
  Update,
  VerifiedEmailUser,
} from "../../services/user";
import {
  GET_USERS,
  UPDATE_USER,
  ADD_USER,
  UPDATE_USER_SUSPENDED,
  VERIFIED_USER,
  EDIT_USER,
  COUNT_USER,
  GET_USER,
  EDIT_RULE,
} from "../constans/users";

const get_Users = (filterage, token) => {
  return (dispatch) => {
    dispatch({ type: START_LOADING });
    List(filterage, token) //hadi hia request:
      .then(({ data }) => {
        if (data.err === false) {
          dispatch({ type: STOP_LOADING });
          dispatch({
            type: GET_USERS,
            payload: data.msg,  
          });
          // console.log(data.msg);
        } else {
          dispatch({ type: STOP_LOADING });
          // dispatch({ type: SHOW_ERROR_MESSAGE, payload : data.msg })
        }
      })
      .catch((err) => {
        // console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING });
        // dispatch({ type: SHOW_ERROR_MESSAGE, payload : "xxxxxxrrrr" })
      });
  };
};

const get_User = (filterage, token) => {
  return (dispatch) => {
    dispatch({ type: START_LOADING });
    List(filterage, token) //hadi hia request:
      .then(({ data }) => {
        if (data.err === false) {
          dispatch({ type: STOP_LOADING });
          dispatch({
            type: GET_USER,
            payload: data.msg[0],
          });
          // console.log(data.msg);
        } else {
          dispatch({ type: STOP_LOADING });
          // dispatch({ type: SHOW_ERROR_MESSAGE, payload : data.msg })
        }
      })
      .catch((err) => {
        // console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING });
        // dispatch({ type: SHOW_ERROR_MESSAGE, payload : "xxxxxxrrrr" })
      });
  };
};

const add_User = (dataValues, token) => {
  return function (dispatch) {
    dispatch({ type: START_LOADING });
    Create(dataValues, token)
      .then((resp) => {
        // console.log("resp  user data", resp);
        if (!resp.data.err) {
          //  console.log("add user data",resp.data.msg);
          dispatch({ type: STOP_LOADING });
          dispatch({
            type: ADD_USER,
            payload: { ...dataValues, _id: resp.data.msg , image : "620d37c4230c0b66f9b191c3"},
          });
          dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "user created" });
        } else {
          dispatch({ type: STOP_LOADING });
          // console.log("add user",resp.data.msg);
          dispatch({ type: SHOW_ERROR_MESSAGE, payload: resp.data.msg });
        }
      })
      .catch((error) => console.log("add user error", error));
  };
};
// const delete_user = (id, token) => async (dispatch) => {
//   dispatch({ type: START_LOADING });
//   Delete(id, token)
//     .then(({ data }) => {
//       if (!data.err) {
//         dispatch({ type: STOP_LOADING });
//         dispatch({
//           type: DELETE_USER,
//           payload: id,
//         });
//       } else {
//         dispatch({ type: STOP_LOADING });
//       }
//     })
//     .catch((err) => {
//       console.log("get orders api err ", err);
//       dispatch({ type: STOP_LOADING });
//     });
// };


const suspendedUser = (id, gfccfcfgcfgcfgcfgcfgcfg, token) => {
  return (dispatch) => {
    dispatch({ type: START_LOADING });
    Suspended(id, gfccfcfgcfgcfgcfgcfgcfg, token)
      .then(({ data }) => {
        if (data.err === false) {
          dispatch({ type: STOP_LOADING });
          dispatch({
            type: UPDATE_USER_SUSPENDED,
            payload: { id, data: gfccfcfgcfgcfgcfgcfgcfg },
          });
          // console.log(data.msg);
        } else {
          dispatch({ type: STOP_LOADING });
          // dispatch({ type: SHOW_ERROR_MESSAGE, payload : data.msg })
        }
      })
      .catch((err) => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING });
        // dispatch({ type: SHOW_ERROR_MESSAGE, payload : "xxxxxxrrrr" })
      });
  };
};
const emailVerifiedUser = (id, token) => {
  return (dispatch) => {
    dispatch({ type: START_LOADING });
    VerifiedEmailUser(id, token)
      .then(({ data }) => {
        if (data.err === false) {
          dispatch({ type: STOP_LOADING });
          dispatch({
            type: VERIFIED_USER,
            payload: id,
          });
          dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "account verified" });
        } else {
          dispatch({ type: STOP_LOADING });
        }
      })
      .catch((err) => {
        console.log("get orders api err ", err);
        dispatch({ type: STOP_LOADING });
      });
  };
};
const count_users = (filterage, fuck) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  Count(filterage, fuck)
    .then(({ data }) => {
      if (!data.err) {
        dispatch({ type: STOP_LOADING });
        dispatch({ type: COUNT_USER, payload: data.msg });
      } else {
        dispatch({ type: STOP_LOADING });
        // dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg })
      }
      //  console.log(data);
    })
    .catch((err) => {
      console.log("get orders api err ", err);
      dispatch({ type: STOP_LOADING });
    });
};
const EditUsers = (id, values, authorization) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  EditUser(id, values, authorization)
    .then(({ data }) => {
      if (!data.err) {
        dispatch({ type: STOP_LOADING });
        dispatch({
          type: EDIT_USER,
          payload: {id , data : values},
        });
         dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "updated" });
      } else {
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg });
      }

      //  console.log(data);
    })
    .catch((err) => {
      console.log("get orders api err ", err);
      dispatch({ type: STOP_LOADING });
      dispatch({
        type: SHOW_ERROR_MESSAGE,
        payload: "something went wrong please try again",
      });
    });
};

const EditUsersImage = (id, values, authorization) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  Image(id, values, authorization)
    .then(({ data }) => {
      if (!data.err) {
        dispatch({ type: STOP_LOADING });
        dispatch({
          type: EDIT_USER,
          payload: {id , data : values},
        });
        // dispatch({ type: CLEAR_MESSAGE });
        dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "updated" });
      } else {
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg });
      }

      //  console.log(data);
    })
    .catch((err) => {
      console.log("get orders api err ", err);
      dispatch({ type: STOP_LOADING });
      dispatch({
        type: SHOW_ERROR_MESSAGE,
        payload: "something went wrong please try again",
      });
    });
};


const Edit_Rule = (id, values, authorization) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  EditRule(id, values, authorization)
    .then(({ data }) => {
      if (!data.err) {
        dispatch({ type: STOP_LOADING });
        dispatch({
          type: EDIT_RULE,
          payload: {id , data : values},
        });
         dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: "updated" });
      } else {
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: data.msg });
      }

      //  console.log(data);
    })
    .catch((err) => {
      console.log("get orders api err ", err);
      dispatch({ type: STOP_LOADING });
      dispatch({
        type: SHOW_ERROR_MESSAGE,
        payload: "something went wrong please try again",
      });
    });
};

export {
  get_Users,
  get_User,
  add_User,
  suspendedUser,
  emailVerifiedUser,
  count_users,
  EditUsers,
  EditUsersImage ,
  Edit_Rule
};