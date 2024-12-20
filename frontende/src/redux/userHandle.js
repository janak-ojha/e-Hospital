import { current } from "@reduxjs/toolkit";
import axios from 'axios';
import {
    authRequest,
    authError,
    authFailed,
    authSuccess,
    authSuccessGetMessage,
    getcanceldeletedcomponent,  
    getRofficedetail,
    stuffAdded  
} from "./userSlice";

// export const registerUser = (fields,currentUser) => async(dispatch) =>{
//     const {role} = fields;
//     console.log(role);
//     console.log(fields);
//     dispatch(authRequest());
//     try {
//          const result = await axios.post(`http://localhost:5000/register${role}`, fields, {
//             headers: { 'Content-Type': 'application/json' ,
//                 Authorization:`Bearer ${currentUser?.token}`,
//             },
//         });
//         console.log(result);
//         if(result.data.email && result.data.officerLevel){
//             dispatch(stuffAdded());
//         }
//         else if(result.data.email){
//            dispatch(authSuccess(result));
//         }
//         else{
//             dispatch(authFailed(result.message));
//         }
//     } catch (error) {
//         console.error('Error:', error.response?.data?.message || error.message);
//         dispatch(authError(error.response?.data?.message || error.message));
//         }
        
//     }

export const registerUser = (fields, currentUser) => async (dispatch) => {
    const { role } = fields;
    console.log(role);
    console.log(fields);
    dispatch(authRequest());

    try {
        const result = await axios.post(
            `http://localhost:5000/register${role}`,
            fields,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.token}`,
                },
            }
        );
        console.log(result);

        // Extract only the necessary data to avoid serializing non-serializable headers
        const { data } = result;
        console.log(data);
        if (data.email && data.officerLevel) {
            dispatch(stuffAdded());
        }else if(data.doctorEmail && data.doctorType){
           
            dispatch(stuffAdded());  
        }
         else if (data.email) {
            // Only pass the serializable data (result.data) to the action
            dispatch(authSuccess(data)); // Pass the response data only, not headers
        } else {
            dispatch(authFailed(result.message));
        }
    } catch (error) {
        console.error('Error:', error.response?.data?.message || error.message);
        dispatch(authError(error.response?.data?.message || error.message));
    }
};

// export const registerUser = (fields,currentUser) => async(dispatch) =>{
//     const {role} = fields;
//     console.log(role);
//     console.log(fields);
//     dispatch(authRequest());
//     try {
//          const result = await axios.post(`http://localhost:5000/register${role}`, fields, {
//             headers: { 'Content-Type': 'application/json' ,
//                 Authorization:`Bearer ${currentUser?.token}`,
//             },
//         });
//         console.log(result);
//         if(result.data.email && result.data.officerLevel){
//             dispatch(stuffAdded());
//         }
//         else if(result.data){
//            dispatch(authSuccess());
//         }
//         else{
//             dispatch(authFailed(result.message));
//         }
//     } catch (error) {
        
//         dispatch(authError(error));
//         }
        
//     }



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


///***** registeredOfficer part  *****///

//getting register user details
export const fetchRegisterUsers = (currentUser) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const token = localStorage.getItem("token") || currentUser?.token;
        console.log(token);
        
        // Make API call
        const response = await axios.get(`http://localhost:5000/registeredDetail`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Registered Users:", response.data);

        // Dispatch response data to Redux store
        dispatch(getRofficedetail(response.data));
    } catch (error) {
        console.error("Error fetching registered users:", error.response?.data || error.message);
        dispatch(authError(error.response?.data || error.message));
    }
};

//deleting the register officer details user detail by id
export const RegistrationhandleDelete = (id, currentUser) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token") || currentUser?.token;
      const response = await axios.delete(`http://localhost:5000/deleteRegisterUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.message);  // Logs success message
      dispatch(fetchRegisterUsers(currentUser));  // Fetch the updated list of users
    } catch (error) {
     // If an error occurs, log it to the console
     console.error("Error updating user:", error.response ? error.response.data : error.message);
     dispatch(authError(error.response?.data || error.message));
    }
  };
  

  export const RegistrationhandleUpdate = (id, userdata, currentUser) => async (dispatch) => {
    console.log(userdata);
    try {
        const token = localStorage.getItem("token") || currentUser?.token;
        
        // Send the PUT request to update the user
        const response = await axios.put(`http://localhost:5000/updateRegisterUser/${id}`, userdata, {
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",
            },
        });
        
        console.log("User updated successfully:", response.data);
        // Dispatch the fetch action to get updated user data
        dispatch(fetchRegisterUsers(currentUser)); 

        return response.data;
    } catch (error) {
        // If an error occurs, log it to the console
        console.error("Error updating user:", error.response ? error.response.data : error.message);
    }
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

