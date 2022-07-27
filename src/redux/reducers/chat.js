import { FRIENDS_GET_SUCCESS,MESSAGE_GET_SUCCESS,MESSAGE_SEND_SUCCESS,UPDATE_FRIEND_MESSAGE ,SEEN_MESSAGE,DELIVARED_MESSAGE, SOCKET_MESSAGE, SEEN_ALL, UPDATE_FRIEND_STATUS} from "../constans/chat";

const INITIAL_STATE = {
    friends : [],
    message : [], 
}

const messengerReducer = (state=INITIAL_STATE , action) =>{
 
    switch(action.type) {
        case FRIENDS_GET_SUCCESS : { 
            return {
                ...state,
                friends : action.payload
            }
        }
        case MESSAGE_GET_SUCCESS : { 
            return {
                ...state,
                message : action.payload
            }
        }

        case MESSAGE_SEND_SUCCESS : {
            return { 
                ...state,
                message : [...state.message,action.payload]
            }
        }
      
        case UPDATE_FRIEND_MESSAGE : {
            const index = state.friends.findIndex(f=> f._id === action.payload.id );
            state.friends[index].chatId = action.payload;
            state.friends[index].chatId.status = action.payload.status;
            return state;
        }


          case UPDATE_FRIEND_STATUS : {
            const index = state.friends.findIndex(f=>f._id === action.payload);
            if(state.friends[index].chatId) {
                state.friends[index].chatId.status = 'seen';
            }
            return {
                ...state
            }
        }

   

        case DELIVARED_MESSAGE : {
            const index = state.friends.findIndex(f=>f._id === action.payload );
            state.friends[index].chatId.status = 'delivared';
            return {
                ...state
            };
        }


     
        case SOCKET_MESSAGE : {
            return {
                ...state,
                message : [...state.message,action.payload]
            }
         }



         case SEEN_MESSAGE : {
            const index = state.friends.findIndex(f=>f._id === action.payload );
            state.friends[index].chatId.status = 'seen';

            return {
                ...state
            };
        }

        case SEEN_ALL : {
            const index = state.friends.findIndex(f=>f._id === action.payload);
            state.friends[index].chatId.status = 'seen';
            
            return {
                ...state
            }
        } 
     

        default : {
          return state  
        } 
    }
   
}

export default messengerReducer