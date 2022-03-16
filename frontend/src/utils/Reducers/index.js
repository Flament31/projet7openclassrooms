import userReducer from "./user";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/lib/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: "authData",
    storage: storage,
    blacklist: ["authData"],
};

const pReducer = persistReducer(persistConfig, userReducer);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, middleware);
const persistStoreData = persistStore(store);

export default (persistStoreData, store)