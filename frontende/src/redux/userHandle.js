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
    getDoctorDetail,
    stuffAdded,  
    getPharmaDetail,
    getLabDetail
} from "./userSlice";


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
        }else if(data.email && data.doctorType){
            dispatch(stuffAdded());  
        }else if(data.pharmacistEmail && data.pharmacistName){
            dispatch(stuffAdded());
        } else if(data.labTechnicianEmail && data.labTechnicianName){
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


export const loginUser = (fields, role) => async (dispatch) => {
   const { email, password } = fields;
   console.log(email,password);
   dispatch(authRequest());
   try {
       const result = await axios.post(`http://localhost:5000/login${role}`, {
           email,
           password
       });
       console.log(result,"hello");
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


///***** Doctorpart  *****///


export const fetchDoctorDetail = (currentUser) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const token = localStorage.getItem("token") || currentUser?.token;
        console.log(token);
        
        // Make API call
        const response = await axios.get(`http://localhost:5000/doctorDetail`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Doctor Users:", response.data);

        // Dispatch response data to Redux store
        dispatch(getDoctorDetail(response.data));
    } catch (error) {
        console.error("Error fetching registered users:", error.response?.data || error.message);
        dispatch(authError(error.response?.data || error.message));
    }
};

//deleting the doctor  detail by id
export const DoctorhandleDelete = (id, currentUser) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token") || currentUser?.token;
      const response = await axios.delete(`http://localhost:5000/deleteDoctor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.message);  // Logs success message
      dispatch(fetchDoctorDetail(currentUser));  // Fetch the updated list of users
    } catch (error) {
     // If an error occurs, log it to the console
     console.error("Error updating user:", error.response ? error.response.data : error.message);
     dispatch(authError(error.response?.data || error.message));
    }
  };


//update the doctorDetail: 
export const DeletehandleUpdate = (id, userdata, currentUser) => async (dispatch) => {
    console.log(userdata);
    try {
        const token = localStorage.getItem("token") || currentUser?.token;
        
        // Send the PUT request to update the user
        const response = await axios.put(`http://localhost:5000/updateDoctor/${id}`, userdata, {
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",
            },
        });
        console.log("User updated successfully:", response.data);
        dispatch(fetchDoctorDetail(currentUser)); 
        return response.data;
    } catch (error) {
        // If an error occurs, log it to the console
        console.error("Error updating user:", error.response ? error.response.data : error.message);
    }
};



///////************ Pharmaparts  **********///////


// get pharma user details
export const fetchPharmaDetail = (currentUser) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const token = localStorage.getItem("token") || currentUser?.token;
        console.log(token);
        // Make API call
        const response = await axios.get(`http://localhost:5000/pharmaDetail`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Pharma Users:", response.data);
        // Dispatch response data to Redux store
        dispatch(getPharmaDetail(response.data));
    } catch (error) {
        console.error("Error fetching registered users:", error.response?.data || error.message);
        dispatch(authError(error.response?.data || error.message));
    }
};
//deleting the doctor  detail by id
export const PharmahandleDelete = (id, currentUser) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token") || currentUser?.token;
      const response = await axios.delete(`http://localhost:5000/deletePharma/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.message);  
      dispatch(fetchPharmaDetail(currentUser));  
    } catch (error) {
     console.error("Error updating user:", error.response ? error.response.data : error.message);
     dispatch(authError(error.response?.data || error.message));
    }
  };
//update the doctorDetail: 
export const PharmahandleUpdate = (id, userdata, currentUser) => async (dispatch) => {
    console.log(userdata);
    try {
        const token = localStorage.getItem("token") || currentUser?.token;
        const response = await axios.put(`http://localhost:5000/updatePharma/${id}`, userdata, {
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",
            },
        });
        console.log("User updated successfully:", response.data);
        dispatch(fetchPharmaDetail(currentUser)); 
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error.response ? error.response.data : error.message);
    }
};






///////************ Lab detail  **********///////






// get pharma user details
export const fetchLabDetail = (currentUser) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const token = localStorage.getItem("token") || currentUser?.token;
        console.log(token);
        // Make API call
        const response = await axios.get(`http://localhost:5000/labDetail`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Lab Users:", response.data);
        // Dispatch response data to Redux store
        dispatch(getLabDetail(response.data));
    } catch (error) {
        console.error("Error fetching registered users:", error.response?.data || error.message);
        dispatch(authError(error.response?.data || error.message));
    }
};
//deleting the doctor  detail by id
export const LabhandleDelete = (id, currentUser) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token") || currentUser?.token;
      const response = await axios.delete(`http://localhost:5000/deleteLab/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.message);  
      dispatch(fetchLabDetail(currentUser));  
    } catch (error) {
     console.error("Error updating user:", error.response ? error.response.data : error.message);
     dispatch(authError(error.response?.data || error.message));
    }
  };
//update the doctorDetail: 
export const LabhandleUpdate = (id, userdata, currentUser) => async (dispatch) => {
    console.log(userdata);
    try {
        const token = localStorage.getItem("token") || currentUser?.token;
        const response = await axios.put(`http://localhost:5000/updateLab/${id}`, userdata, {
            headers: {
                "Authorization": `Bearer ${token}`, 
                "Content-Type": "application/json",
            },
        });
        console.log("User updated successfully:", response.data);
        dispatch(fetchLabDetail(currentUser)); 
        return response.data;
    } catch (error) {
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

