import { compose, applyMiddleware, createStore, Store, combineReducers } from "redux";
import reduxThunk from 'redux-thunk';
import { state } from "./reducers";



const a: any = window;



// Checks to see if the redux devtools are active on the browser
const composeEnhancers = a.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Configures middlware processes that can interact with the Redux
const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk)
);

export const store: Store<any> = createStore(
    state,
    enhancer
)