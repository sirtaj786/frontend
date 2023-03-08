import { legacy_createStore,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk"
import { productReducer } from "./product.reducer";
import { CartReducer } from "./cart.reducer";

const rootReducer=combineReducers({
productReducer,CartReducer
})
export const store= legacy_createStore(rootReducer,applyMiddleware(thunk))