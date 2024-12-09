import { current } from "@reduxjs/toolkit";
import axios from 'axios';
import {
    authRequest,
    authError,
    authFailed,
    authSuccess,
    authSuccessGetMessage,
    getcanceldeletedcomponent,
    getAdminDetail,
    
} from "./userSlice";

export const registerUser = (fields,currentUser) => async(dispatch) =>{
    const {role} = fields;
    console.log(role);
    console.log(fields);
    dispatch(authRequest());
    try {
        let result = await fetch(`http://localhost:5000/register${role}`,{
            method:"post",
            body:JSON.stringify(fields),
            headers:{
                "Content-type":"application/json",
            }
        });
        result=await result.json();
        if(result.email){
            dispatch(authSuccess(result));
        }else{
            dispatch(authFailed(result.message));
        }
    } catch (error) {
            dispatch(authError(error.message))
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

// Action to get admin details
export const AdminDetails = () => async (dispatch) => {
    dispatch(authRequest());  // Dispatch loading state
    try {
        // Make the API call to fetch the admin details
        const response = await axios.get(`http://localhost:5000/admindetails`);
        console.log(response.data);  // Optionally log the response

        // Dispatch the action to store the admin details in Redux state
        dispatch(getAdminDetail(response.data));
    } catch (error) {
        // Dispatch the error state if there's an issue fetching the data
        dispatch(authError("Error fetching admin details"));
    }
};