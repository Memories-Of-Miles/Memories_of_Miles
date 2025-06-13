import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 1. signInStart
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // 2. signInSuccess
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },

    // 3. signInFailure
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 4. signOut
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    // 5. setCurrentUser
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  setCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
