import {createSlice} from "@reduxjs/toolkit";

const initialState={
    status:"idle",
    loading:false,
    currentUser:JSON.parse(localStorage.getItem("user")) || null,
    currentRole:(JSON.parse(localStorage.getItem("user")) || {}).role || null,
    deleteComponent: false,
    error:null,
    response:null,
    tempRegisterDetail: [],
    DoctorDetail: [],
    pharmaDetail:[],
    labDetail:[],
    
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        authRequest:(state) =>{
            state.status="loading"
            state.loading=true;
        },
        authSuccess:(state,action) =>{
            state.status="success";
            state.loading=false;
            state.currentUser=action.payload;
            state.currentRole=action.payload.role;
            localStorage.setItem("user",JSON.stringify(action.payload));
        },
        authSuccessGetMessage:(state,action) =>{
            state.status="success";
            state.loading=false;
            state.response=action.payload
        },
        authFailed:(state,action)=>{
            state.status="failed";
            state.loading=false;
            state.response=action.payload;
        },
        authError:(state,action) =>{
            state.status="error";
            state.loading=false;
            state.error=action.payload;
        },
        getcanceldeletedcomponent: (state) =>{
            state.deleteComponent =false;
            state.response = null;
            state.status ="idle";
        },
        stuffAdded:(state) =>{
            state.status="added";
            state.loading=false;
            state.error = null;
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
        },
        getRofficedetail:(state,action) =>{
            state.loading=false;
            state.tempRegisterDetail=action.payload;
        },
        getDoctorDetail:(state,action) =>{
            state.loading=false;
            state.DoctorDetail=action.payload;
        },
        getPharmaDetail:(state,action) =>{
            state.loading=false;
            state.pharmaDetail=action.payload;
        },
        getLabDetail:(state,action) =>{
            state.loading=false;
            state.labDetail=action.payload;
        },
        
        logout: (state) => {
            state.currentUser = null;
            state.currentRole = null;
            state.status = "idle";
            localStorage.removeItem("user"); // Clear user data from local storage
          },
    },
});

export const{
    authRequest,
    authSuccess,
    authSuccessGetMessage,
    authFailed,
    authError,
    getcanceldeletedcomponent,
    getAdminDetail,
    stuffAdded,
    underControl,
    getRofficedetail,
    getDoctorDetail,
    getPharmaDetail,
    getLabDetail,
    logout,
}=userSlice.actions;
export const userReducer = userSlice.reducer;