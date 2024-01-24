import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: [],
  isAuthenticated: false,
  load: false,
  imgLink: process.env.NEXT_PUBLIC_IMAGE_API_KEY,
};

export const others = createSlice({
  name: "Mediensure Others",
  initialState,
  reducers: {
    getHomepageRequest: (state, action) => {
      state.load = true;
    },
    getHomepageSuccess: (state, action) => {
      (state.homepage = action.payload.homepage), (state.load = false);
    },
    getHomepageFail: (state, action) => {
      state.loading = false;
    },
    getDentalRequest: (state, action) => {
      state.load = true;
    },
    getDentalSuccess: (state, action) => {
      (state.dental = action.payload.dental), (state.load = false);
    },
    getDentalFail: (state, action) => {
      state.loading = false;
    },
    getDoctorRequest: (state, action) => {
      state.load = true;
    },
    getDoctorSuccess: (state, action) => {
      (state.Doctor = action.payload.doctor),
        (state.load = false),
        (state.percentage = action.payload.percentage.consultationFees);
    },
    getDoctorFail: (state, action) => {
      state.loading = false;
    },
    getDentalEquipmentRequest: (state, action) => {
      state.load = true;
    },
    getDentalEquipmentSuccess: (state, action) => {
      (state.dentalEquipment = action.payload.equipment), (state.load = false);
    },
    getDentalEquipmentFail: (state, action) => {
      state.loading = false;
    },
    getEyeCareRequest: (state, action) => {
      state.load = true;
    },
    getEyeCareSuccess: (state, action) => {
      (state.eyeCare = action.payload.eye), (state.load = false);
    },
    getEyeCareFail: (state, action) => {
      state.loading = false;
    },
    getEyeDoctorRequest: (state, action) => {
      state.load = true;
    },
    getEyeDoctorSuccess: (state, action) => {
      (state.EyeDoctor = action.payload.eye), (state.load = false);
    },
    getEyeDoctorFail: (state, action) => {
      state.loading = false;
    },
    getEyeEquipmentRequest: (state, action) => {
      state.load = true;
    },
    getEyeEquipmentSuccess: (state, action) => {
      (state.eyeEquipment = action.payload.equipment), (state.load = false);
    },
    getEyeEquipmentFail: (state, action) => {
      state.load = false;
    },
    getProductSuccess: (state, action) => {
      state.product = action.payload.product;
    },
    getLeadRequest: (state, action) => {
      state.load = false;
    },
    getLeadSuccess: (state, action) => {
      (state.load = true), (state.message = "Request sent successfully");
    },
    getLeadFail: (state, action) => {
      state.load = false;
    },
    clearMessage: (state, action) => {
      state.message = null;
    },
    getPrescriptionRequest: (state, action) => {
      state.load = true;
    },
    getPrescriptionSuccess: (state, action) => {
      (state.load = false), (state.prescription = action.payload.prescription);
    },
    getPrescriptionFail: (state, action) => {
      (state.load = false), (state.prescription = null);
    },
    getBlogSuccess: (state, action) => {
      state.blog = action.payload.blog;
    },
    getPostSuccess: (state, action) => {
      state.post = action.payload.post;
    },
  },
});

export const {
  getHomepageSuccess,
  getHomepageFail,
  getHomepageRequest,
  getDentalRequest,
  getDentalSuccess,
  getDentalFail,
  getDoctorFail,
  getDoctorSuccess,
  getDoctorRequest,
  getDentalEquipmentRequest,
  getDentalEquipmentFail,
  getDentalEquipmentSuccess,
  getEyeCareFail,
  getEyeCareSuccess,
  getEyeCareRequest,
  getEyeDoctorFail,
  getEyeDoctorRequest,
  getEyeDoctorSuccess,
  getEyeEquipmentFail,
  getEyeEquipmentSuccess,
  getEyeEquipmentRequest,
  getProductSuccess,
  getLeadFail,
  getLeadRequest,
  getLeadSuccess,
  clearMessage,
  getPrescriptionFail,
  getPrescriptionRequest,
  getPrescriptionSuccess,
  getBlogSuccess,
  getPostSuccess,
} = others.actions;
export default others.reducer;
