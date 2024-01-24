import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthencticated: false,
  loading: false,
};

export const auth = createSlice({
  name: "Mediensure",
  initialState,
  reducers: {
    isUserRequest: (state, action) => {
      state.loading = false;
    },
    isUser: (state, action) => {
      (state.isAuthencticated = true),
        (state.user = action.payload),
        (state.loading = false);
    },
    isUserFail: (state, acction) => {
      state.loading = false;
    },
    getConsultation: (state, action) => {
      state.consult = action.payload.consult;
    },
    getOffConsultation: (state, action) => {
      state.ofconsult = action.payload.consult;
    },
    getNetworkRequest: (state, action) => {
      state.loading = true;
    },
    getNetworkSuccess: (state, action) => {
      (state.loading = false), (state.network = action.payload.network);
    },
    getNetworkFail: (state, action) => {
      state.loading = true;
    },
    request: (state, action) => {
      state.loading = true;
    },
    success: (state, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    fail: (state, action) => {
      state.loading = false,
      state.error = action.payload.message
    },
    removeMsg :(state, action) => {
      state.message = null
    },
    removeErr :(state, action) => {
      state.error = null
    },
  },
});

export const {
  fail,
  success,
  request,
  isUser,
  isUserFail,
  isUserRequest,
  getConsultation,
  getNetworkFail,
  getNetworkRequest,
  getNetworkSuccess,
  removeErr,
  removeMsg,
  getOffConsultation
} = auth.actions;
export default auth.reducer;
