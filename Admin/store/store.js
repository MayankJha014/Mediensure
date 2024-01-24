import { configureStore } from "@reduxjs/toolkit"; 
import  adminReducer  from "./Reducer/AdminReducer";
import  others  from "./Reducer/other";
export const store = configureStore({
    reducer:{
        adminReducer,
        others
    }
})