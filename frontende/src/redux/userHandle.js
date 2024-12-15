import { current } from "@reduxjs/toolkit";
import axios from 'axios';
import {
    authRequest,
    authError,
    authFailed,
    authSuccess,
    authSuccessGetMessage,
    getcanceldeletedcomponent,  
    stuffAdded  
} from "./userSlice";

export const registerUser = (fields,currentUser) => async(dispatch) =>{
    const {role} = fields;
    console.log(role);
    console.log(fields);
    dispatch(authRequest());
    try {
         const result = await axios.post(`http://localhost:5000/register${role}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(result);
        if(result.data.hospitalname){
            dispatch(authSuccess(result.data));
        }
        else{
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
            dispatch(authError(error))
        }
        
    }


export const loginUser = (fields, role) => async (dispatch) => {
   const { email, password } = fields;
   dispatch(authRequest());
   try {
       const result = await axios.post(`http://localhost:5000/login${role}`, {
           email,
           password
       });
       console.log(result);
       if (result.data.role) {
           dispatch(authSuccess(result.data)); 
       } else {
           dispatch(authFailed(result.data.message)); 
       }
   } catch (error) {
       const errorMessage = error.response ? error.response.data.message : error.message;
       dispatch(authError(errorMessage));
   }
};
export const cancelDelete= () =>
    (dispatch) =>{
        dispatch(getcanceldeletedcomponent());
    };


export const handleResetPassword = (email,role)=> async (dispatch) => {
    dispatch(authRequest());
    const fields = {email,role}
    try {
        let result = await axios.post(`http://localhost:5000/resetpassword`,{
            fields
        });
        console.log(result);
        if(result.status === 200){
            dispatch(authSuccessGetMessage(result.message));
        }else{
            dispatch(authFailed(result.message));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

