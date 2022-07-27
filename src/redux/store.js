import { createStore, applyMiddleware , combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingReducer from './reducers/loading';
import ordersReducer from './reducers/orders';
import messageReducer from './reducers/message';
import productsReducer from './reducers/products';
import cartsReducer from './reducers/carts';
import wishlistReducer from './reducers/wishlist';
import mainReducer from './reducers/main';
import subscribeReducer from './reducers/subscribe';
import categoriesReducer from './reducers/categories';
import userReducer from './reducers/users';
import authReducer from './reducers/auth';
import contactsReducer from './reducers/contact';
import chatReducer from './reducers/chat';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 


const middlewares = [thunk]

const reducer = combineReducers({
    loading : loadingReducer ,
    orders : ordersReducer ,
    message : messageReducer ,
    products : productsReducer,
    carts : cartsReducer,
    wishlist : wishlistReducer ,
    main : mainReducer ,
    subscribe : subscribeReducer ,
    auth : authReducer,
    user : userReducer,
    contacts : contactsReducer,
    categories : categoriesReducer,
    chat : chatReducer,
})

const persistConfig = { 
    key: 'auth',
    storage,
    whitelist : ["auth"]
}

const persistReducers = persistReducer(persistConfig , reducer)

const initialState = {}

const store = createStore(persistReducers , initialState , composeWithDevTools(applyMiddleware(...middlewares)))
const persist = persistStore(store)

export default store ;
export  {persist} ;