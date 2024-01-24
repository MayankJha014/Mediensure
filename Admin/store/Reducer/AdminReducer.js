import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isAuthenticatedDoctor: false,
  isAuthenticatedOperator:false,
  // imgLink: "http://localhost:8080/api/v1/admin/get/image",
  loading: false,
};

export const adminReducer = createSlice({
  name: "mediensure admin",
  initialState,
  reducers: {
    isError: (state, action) => {
      state.error.push(action.payload);
    },
    RemoveError: (state, action) => {
      state.error = [];
    },
    adminLogin: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    adminLogout: (state, action) => {
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.message = true;
    },
    removeMessage: (state, action) => {
      state.message = false;
    },
    getadminRequest: (state, action) => {
      state.loading = true;
    },
    getadminFail: (state, action) => {
      (state.loading = false), (state.error = action.payload.message);
    },
    getadminSuccess: (state, action) => {
      state.loading = false;
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    msgRequest: (state, action) => {
      (state.loading = true), (state.msg = null);
    },
    getmessage: (state, action) => {
      (state.msg = action.payload.message), (state.loading = false);
    },
    msgFail: (state, action) => {
      (state.loading = false), (state.msg = "Error");
    },
    InitialcaseSuccess: (state, action) => {
      (state.initialCase = action.payload.initialCase),
        console.log(action.payload);
    },
    getimg: (state, action) => {
      state.url = action.payload;
      console.log(action.payload, "hello", 741);
    },
    CompanyRequest: (state, action) => {
      state.loading = true;
    },
    CompanySuccess: (state, action) => {
      (state.loading = false),
        (state.success = action.payload.success),
        (state.message = action.payload.message);
    },
    getInstituteSuccess: (state, action) => {
      (state.loading = false),
        (state.success = action.payload.success),
        (state.message = action.payload.message),
        (state.institute = action.payload.institute);
    },
    getOperatorSuccess: (state, action) => {
      (state.loading = false),
        (state.success = action.payload.success),
        (state.message = action.payload.message),
        (state.operator = action.payload.operator);
    },
    getNetworkConsultSuccess: (state, action) => {
      (state.loading = false),
        (state.success = action.payload.success),
        (state.message = action.payload.message),
        (state.nconsult = action.payload.consultation);
    },
    doctorRequest: (state, action) => {
      state.loading = true;
    },
    doctorSuccess: (state, action) => {
      (state.loading = false),
        (state.isAuthenticatedDoctor = true),
        (state.message = action.payload.message),
        (state.error = action.payload.error);
    },
    doctorFormSuccess: (state, action) => {
      (state.loading = false),
        (state.message = action.payload.message),
        (state.error = action.payload.error);
      state.doctorForm = true;
    },
    clearDoctorForm: (state, action) => {
      (state.loading = false), (state.message = null), (state.error = null);
      state.doctorForm = false;
    },
    doctorOtpSuccess: (state, action) => {
      (state.loading = false),
        (state.message = action.payload.message),
        (state.error = action.payload.error);
      if (action.payload.message === "OTP verified successfully") {
        state.otpVerify = true;
      }
    },
    doctorEmailOtpSuccess: (state, action) => {
      (state.loading = false),
        (state.message = action.payload.message),
        (state.error = action.payload.error);
      if (action.payload.message === "Email OTP verified successfully") {
        state.otpEmail = true;
      }
    },
    doctorFail: (state, action) => {
      state.loading = false;

      // state.error = action.payload.error
    },
    doctorFormFail: (state, action) => {
      (state.msg = action.payload.message), (state.loading = false);
    },
    otpFail: (state, action) => {
      (state.loading = false), (state.error = action.payload.error);
    },
    clearOtpEmail: (state, action) => {
      state.otpEmail = false;
    },
    CompanyFail: (state, action) => {
      state.loading = false;
    },
    getPatientSuccess: (state, action) => {
      (state.patient = action.payload.patient), (state.loading = false);
    },
    isDoctorRequest: (state, action) => {
      state.loading = true;
    },
    isDoctorLoingFail: (state, action) => {
      (state.loading = false), (state.error = action.payload.message);
    },
    isDoctor: (state, action) => {
      (state.loading = true),
        (state.isAuthenticatedDoctor = true),
        (state.success = true),
        (state.doctor = action.payload);
    },
    isDoctorFail: (state, action) => {
      (state.isAuthenticatedDoctor = false), (state.success = false);
    },
    
    doctorNotificationRequest: (state, action) => {
      state.loading = true;
    },
    doctorNotificationSuccess: (state, action) => {
      (state.loading = false),
        (state.notificationNumber = action.payload.number),
        (state.notification = action.payload.notification);
    },
    doctorNotificationFail: (state, action) => {
      state.loading = false;
    },
    getAppointmentSuccess: (state, action) => {
      (state.appointment = action.payload.appoint), (state.loading = false);
    },
    getConsultation: (state, action) => {
      (state.consultation = action.payload.consultation),
        (state.loading = false);
    },
    getLeadsSuccess: (state, action) => {
      (state.homeLeads = action.payload.homepage),
        (state.providerLeads = action.payload.provider),
        (state.ivf = action.payload.ivf),
        (state.product = action.payload.product),
        (state.loading = false);
    },
    clearmessage: (state, action) => {
      state.message = null;
    },
    clearmsg: (state, action) => {
      state.msg = null;
    },
    clearError: (state, action) => {
      state.error = null;
    },
    clearVerifyOtp: (state, action) => {
      state.otpVerify = false;
    },
    getTokenSuccess: (state, action) => {
      state.token = action.payload.token;
    },
    isOperatorLoingFail: (state, action) => {
      (state.loading = false), (state.error = action.payload.message);
    },
    isOperator: (state, action) => {
      (state.loading = true),
        (state.isAuthenticatedOperator = true),
        (state.success = true),
        (state.operator = action.payload);
    },
    isOperatorFail: (state, action) => {
      (state.isAuthenticatedDoctor = false), (state.success = false);
    },
  },
});

export const {
  isError,
  RemoveError,
  adminLogin,
  adminLogout,
  loginSuccess,
  getimg,
  removeMessage,
  getadminSuccess,
  getmessage,
  clearmessage,
  msgRequest,
  msgFail,
  CompanyRequest,
  CompanyFail,
  CompanySuccess,
  InitialcaseSuccess,
  doctorFail,
  doctorRequest,
  doctorSuccess,
  clearError,
  isDoctor,
  isDoctorFail,
  doctorNotificationFail,
  doctorNotificationRequest,
  doctorNotificationSuccess,
  getConsultation,
  getLeadsSuccess,
  getPatientSuccess,
  getAppointmentSuccess,
  doctorOtpSuccess,
  clearVerifyOtp,
  otpFail,
  clearOtpEmail,
  doctorEmailOtpSuccess,
  doctorFormSuccess,
  clearDoctorForm,
  clearmsg,
  doctorFormFail,
  getInstituteSuccess,
  getNetworkConsultSuccess,
  getTokenSuccess,
  getadminFail,
  getadminRequest,
  isDoctorRequest,
  isDoctorLoingFail,
  isOperator,
  isOperatorFail,
  isOperatorLoingFail,
  getOperatorSuccess
} = adminReducer.actions;
export default adminReducer.reducer;
