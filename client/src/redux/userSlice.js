import { createSlice} from "@reduxjs/toolkit";

const initialState ={
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false
    },
    updateUserStart: (state) => {
      state.loading = true
    },
    UpdateuserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    UpdateuserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart : (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUserStart : (state) => {
      state.loading = true;
    },
   logoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    logoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});


export const {signInStart, 
  signInFailure, 
  signInSuccess, 
  updateUserStart, 
  UpdateuserFailure, 
  UpdateuserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logoutSuccess,
  logoutUserFailure,
  logoutUserStart,
} = userSlice.actions;

export default userSlice.reducer;