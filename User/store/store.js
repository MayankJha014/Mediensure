import { configureStore } from "@reduxjs/toolkit";
import auth from "./Reducer/auth";
import others from "./Reducer/others";

export const store = configureStore(
    {
        reducer:{
            auth,
        others
    }
    }
)