import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // Optionally, you can whitelist specific reducers to persist
  // whitelist: ['user'],
};
