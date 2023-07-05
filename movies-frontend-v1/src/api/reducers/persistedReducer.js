import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers as needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
