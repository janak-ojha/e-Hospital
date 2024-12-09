import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";

const redux= configureStore({
    reducer:{
        user:userReducer,
    }
});
export default redux;