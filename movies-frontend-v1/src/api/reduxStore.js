import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Choose the storage mechanism (e.g., local storage, session storage)

import rootReducer from "./reducers";

// Configure the Redux Persist options
const persistConfig = {
  key: "root", // Key for the root of the state object
  storage, // Storage mechanism to use
};

// Create the persisted reducer by wrapping the root reducer with the persistReducer function
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = createStore(persistedReducer);

// Create the persistor object for persisting and rehydrating the state
const persistor = persistStore(store);

export { store, persistor };
