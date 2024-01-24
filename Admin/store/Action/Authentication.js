import {
  RemoveError,
  isError,
  adminLogin,
  adminLogout,
  loginSuccess,
  getadminSuccess,
  getmessage,
  msgRequest,
  msgFail,
  adminData,
  InitialcaseSuccess,
  getimg,
  CompanyRequest,
  CompanyFail,
  CompanySuccess,
  doctorFail,
  doctorSuccess,
  isDoctor,
  isDoctorFail,
  doctorNotificationRequest,
  doctorNotificationSuccess,
  doctorNotificationFail,
  getConsultation,
  getLeadsSuccess,
  getPatientSuccess,
  getAppointmentSuccess,
  doctorOtpSuccess,
  otpFail,
  doctorRequest,
  doctorEmailOtpSuccess,
  doctorFormSuccess,
  doctorFormFail,
  getInstituteSuccess,
  getNetworkConsultSuccess,
  getTokenSuccess,
  getadminRequest,
  getadminFail,
  isDoctorRequest,
  isDoctorLoingFail,
  isOperator,
  isOperatorLoingFail,
  getOperatorSuccess,
} from "../Reducer/AdminReducer";
import axios from "@/Axios/axios";
// import { Try } from "@mui/icons-material";
// import {axios} from "@/utlis/axios";
// import axios from "../../utlis/axios.js";
//   ---------------------------------------------------- ADMIN ROUTES ---------------------------------------- //
export const getadmin = () => async (dispatch, getState) => {
  dispatch(getadminRequest())
  try {
    const { data } = await axios.get(`/admin/admin`);
    dispatch(adminLogin());
    dispatch(getadminSuccess(data));
  } catch (error) {
  dispatch(getadminFail(error.response.data))
  
  }
};
export const signinadmin = (info) => async (dispatch, getState) => {
  dispatch(getadminRequest())

  try {
    const { data } = await axios.post(`/admin/signin`, info);

    dispatch(adminLogin());
  } catch (error) {
    dispatch(getadminFail(error.response.data))

  }
};
export const signoutadmin = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/admin/signout`);

    dispatch(adminLogout());
  } catch (error) {
    // console.log(error.response.data.message);
  }
};
export const forgetPassword = (email) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/admin/internadmin/sendmail`, email);
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(isError(error.response.data.message));
  }
};

export const changePassword = (id, password) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/forgetlink/${id}`, password);
    dispatch(loginSuccess());
    //  console.log(data);
  } catch (error) {
    // console.log(error);
    dispatch(isError(error.response.data.message));
  }
};
export const registeradmin = (info) => async (dispatch, getState) => {
  console.log(info);
  try {
    console.log(info);
    const { data } = await axios.post(`/admin/login`, info);
    console.log(data);
    dispatch(adminLogin(data));
  } catch (error) {
    console.log(error);
    dispatch(isError(error.response.data.message));
  }
};
// Add InitialCase

export const addInitial = (info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/add/initialcase", info);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const getInitialCase = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/get/initialcase");
    dispatch(InitialcaseSuccess(data));
  } catch (error) {}
};
export const deleteInitialCase = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/delete/initialcase/${id}`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const updateInitialCase = (info, id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/update/initialcase/${id}`, info);
    console.log(data);
  } catch (error) {
    console.log(error, 753);
  }
};
export const uploadImage = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/banner", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    CompanyFail();
  }
};
export const uploadImageComnpany = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/home/company", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const getImage = (info) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "/get/image/35b96c3bc344f741a1d8d6168d6b6c1e38c3a84e/image/png"
    );
    // const {data} = await axios.post('/delete/image/05854634024de439afbb5bf4c3c62aa060c69af3');
    console.log(data, 741);
    // return data;
    // const imageUrl = `data:image/jpeg;base64,${Buffer.from(data, 'binary').toString('base64')}`;
    dispatch(getimg("35b96c3bc344f741a1d8d6168d6b6c1e38c3a84e/image/png"));
  } catch (error) {}
};
export const deleteHomePage = (uid, imageId) => async (dispatch) => {
  // dispatch(getHomepageRequest());

  dispatch(CompanyRequest());
  try {
    const info = {
      imageId: imageId,
    };
    const { data } = await axios.post(
      `/admin/delete/home/company/${uid}`,
      info
    );
    // dispatch(CompanySuccess(data));

    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());

    // dispatch(getHomepageFail());
  }
};
export const uploadReview = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/review", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const deleteReview = (uid, imageId) => async (dispatch) => {
  // dispatch(getHomepageRequest());
  dispatch(CompanyRequest());
  try {
    const info = {
      imageId: imageId,
    };
    const { data } = await axios.post(`/admin/delete/home/review/${uid}`, info);
    dispatch(CompanySuccess(data));

    // dispatch(getHomepageSuccess(data));
  } catch (error) {
    // dispatch(getHomepageFail());
    dispatch(CompanyFail());
  }
};
export const uploadPost = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/post", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const changeStatusPost = (id) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get(`/admin/status/post/${id}`);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadBlog = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/blog", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const changeStatusBlog = (id) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get(`/admin/status/blog/${id}`);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadImageHealth = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/home/health", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const deleteHealth = (uid, imageId) => async (dispatch) => {
  dispatch(getHomepageRequest());

  dispatch(CompanyRequest());
  try {
    const info = {
      imageId: imageId,
    };
    const { data } = await axios.post(`/admin/delete/home/health/${uid}`, info);
    dispatch(CompanySuccess(data));

    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());

    dispatch(getHomepageFail());
  }
};

export const uploadDentalBanner = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/dental/banner", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadDentalEquipmentBanner = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post(
      "/admin/upload/dental/equipmentBanner",
      info
    );
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadDentalPlan = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/dental/plan", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadDentalInclusions = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/dental/inclusions", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const deleteDentalPlan = (id) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get(`/admin/delete/dental/plan/${id}`);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const deleteDentalInclusion = (id) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get(`/admin/delete/dental/inclusions/${id}`);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadDoctor = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/doctor/upload/doctor", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};

export const deleteDentalDoctor = (id) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get(`/admin/delete/dental/doctor/${id}`);
    dispatch(CompanySuccess());
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const updateDentalDoctor = (id, info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post(
      `/admin/update/dental/doctor/${id}`,
      info
    );
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};

export const uploadDentalEqupment = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/dental/equipment", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const deleteDentalEqupment = (id) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get(`/admin/delete/dental/equipment/${id}`);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const updateEquipment = (id) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get(`/admin/update/equipment/${id}`);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadEyeBanner = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/eye/banner", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadEyePlan = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/eye/plan", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadEyeDoctor = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/eye/doctor", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadEyeInclusions = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/eye/inclusions", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadEyeEqupment = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/eye/equipment", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const checkAdmin = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/admin/admin`);
    dispatch(adminLogin());
    // dispatch(getadminSuccess(data));
  } catch (error) {
    dispatch(adminLogout());
    window.location.href = "/";
  }
};
export const doctorVerified = (id) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get(`/admin/doctor/verified/${id}`);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const updateConsultFees = (info) => async (dispatch) => {
  dispatch(CompanyRequest());

  try {
    const { data } = await axios.post("/admin/update/consultfees", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadPrice = (id, info) => async (dispatch) => {
  dispatch(CompanyRequest());

  try {
    const { data } = await axios.post(`/admin/update/price/doctor/${id}`, info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const getAllConsultation = () => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get("/admin/get/all/consultation");
    dispatch(getConsultation(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const getAllConsultationOp = () => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get("/admin/operator/get/all/consultation");
    dispatch(getConsultation(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const getLeads = () => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get("/admin/get/all/lead");
    dispatch(getLeadsSuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const getLeadsOperator = () => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get("/admin/operator/get/all/lead");
    dispatch(getLeadsSuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const getAllPatient = () => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get("/admin/get/all/patient");
    dispatch(getPatientSuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const getAllPatientOperator = () => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get("/admin/operator/get/all/patient");
    dispatch(getPatientSuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadDentalReview = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/equipment/review", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadIvfBanner = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/ivf/banner", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const uploadIvfReview = (info) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.post("/admin/upload/ivf/review", info);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const deleteIvfReview = (id) => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get(`/admin/delete/ivf/review/${id}`);
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};
export const getInstitute = ()=>async(dispatch)=>{
  dispatch(CompanyRequest())
  try {
    const {data} = await axios.get("/admin/get/institute");
   dispatch(getInstituteSuccess(data))
  } catch (error) {
    dispatch(CompanyFail());
  }
}
export const getInstituteOperator = ()=>async(dispatch)=>{
  dispatch(CompanyRequest())
  try {
    const {data} = await axios.get("/admin/operator/get/institute");
   dispatch(getInstituteSuccess(data))
  } catch (error) {
    dispatch(CompanyFail());
  }
}
export const getOperatorDets = ()=>async(dispatch)=>{
  dispatch(CompanyRequest())
  try {
    const {data} = await axios.get("/admin/get/operator");
   dispatch(getOperatorSuccess(data))
  } catch (error) {
    dispatch(CompanyFail());
  }
}
export const updateOperatorStatus = (id)=>async(dispatch)=>{
  dispatch(CompanyRequest())
  try {
    const {data} = await axios.get(`/admin/update/operator/${id}`);
   dispatch(CompanySuccess(data))
  } catch (error) {
    dispatch(CompanyFail());
  }
}
export const getNetworkConsult = ()=>async(dispatch)=>{
  dispatch(CompanyRequest())
  try {
    const {data} = await axios.get("/admin/get/network/consultation");
   dispatch(getNetworkConsultSuccess(data))
  } catch (error) {
    dispatch(CompanyFail());
  }
}
export const getNetworkConsultOperator = ()=>async(dispatch)=>{
  dispatch(CompanyRequest())
  try {
    const {data} = await axios.get("/admin/operator/get/network/consultation");
   dispatch(getNetworkConsultSuccess(data))
  } catch (error) {
    dispatch(CompanyFail());
  }
}
export const updateNetworkConsult = (id,info)=>async(dispatch)=>{
  dispatch(CompanyRequest())
  try {
    const {data} = await axios.post(`/network/update/network/${id}`,info);
    dispatch(CompanySuccess(data))
  } catch (error) {
    dispatch(CompanyFail())
  }
}
export const updateNetworkConsultOperator = (id,info)=>async(dispatch)=>{
  dispatch(CompanyRequest())
  try {
    const {data} = await axios.post(`/network/operator/update/network/${id}`,info);
    dispatch(CompanySuccess(data))
  } catch (error) {
    dispatch(CompanyFail())
  }
}
// -------------------------------------------- DOCTOR ROUTES --------------------------------------------------- //
export const sendOtpDoctor = (info) => async (dispatch) => {
  dispatch(doctorFail());
  try {
    const { data } = await axios.post("/doctor/send/otp", info);
    dispatch(doctorSuccess(data));
  } catch (error) {
    // console.log(error,456);
    dispatch(doctorFail());
    // console.log(error);
  }
};
export const sendEmailDoctor = (info) => async (dispatch) => {
  dispatch(doctorRequest());
  try {
    const { data } = await axios.post("/doctor/email/otp", info);
    dispatch(doctorSuccess(data));
  } catch (error) {
    // console.log(error,456);
    dispatch(doctorFail());
    // console.log(error);
  }
};
export const VerifyEmailDoctor = (info) => async (dispatch) => {
  dispatch(doctorRequest());
  try {
    const { data } = await axios.post("/doctor/verify/email/otp", info);
    dispatch(doctorEmailOtpSuccess(data));
  } catch (error) {
    // console.log(error,456);
    dispatch(otpFail(error.response.data));
    // console.log(error);
  }
};
export const VerifyDoctor = (info) => async (dispatch) => {
  dispatch(doctorFail());
  try {
    const { data } = await axios.post("/doctor/verify/otp", info);
    dispatch(doctorOtpSuccess(data));
  } catch (error) {
    // console.log(error,456);
    dispatch(doctorFail());
    // console.log(error);
  }
};

export const registerDoctor = (info) => async (dispatch) => {
  dispatch(doctorFail());
  try {
    const { data } = await axios.post("/doctor/register", info);
    dispatch(doctorSuccess(data));
  } catch (error) {
    dispatch(doctorFail());
  }
};
export const registerOperator = (info) => async (dispatch) => {
  dispatch(doctorFail());
  try {
    const { data } = await axios.post("/admin/operator/register", info);
    dispatch(isOperator(data));
  } catch (error) {
    dispatch(isOperatorLoingFail());
  }
};
export const registerDoctorForm = (info) => async (dispatch) => {

  dispatch(doctorRequest());

  try {
    const { data } = await axios.post("/doctor/register/form", info);
    dispatch(doctorFormSuccess(data));

  } catch (error) {

    dispatch(doctorFormFail(error.response.data));
  }
};
export const registerInstitutionForm = (info) => async (dispatch) => {
  dispatch(doctorRequest());
  try {
    const { data } = await axios.post("/doctor/register/form/institution", info);


    dispatch(doctorFormSuccess(data));
  } catch (error) {
    dispatch(doctorFormFail(error));
  }
};
export const loginDoctor = (info) => async (dispatch) => {
  dispatch(isDoctorRequest())

  try {
    const { data } = await axios.post("/doctor/login", info);
    dispatch(doctorSuccess(data));
  } catch (error) {
    dispatch(isDoctorLoingFail(error.response.data))

  }
};
export const loginOperator = (info) => async (dispatch) => {
  dispatch(isDoctorRequest())

  try {
    const { data } = await axios.post("/admin/operator/login", info);
    dispatch(isOperator(data));
  } catch (error) {
    dispatch(isOperatorLoingFail(error.response.data))

  }
};
export const getDoctor = () => async (dispatch, getState) => {
  dispatch(isDoctorRequest())
  try {
    const { data } = await axios.get(`/doctor/doctor`);
    dispatch(isDoctor(data));
    // dispatch(getadminSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(isDoctorLoingFail(error.response.data))
  }
};
export const getOperator = () => async (dispatch, getState) => {
  dispatch(isDoctorRequest())
  try {
    const { data } = await axios.get(`/admin/operator`);
    dispatch(isOperator(data));
    // dispatch(getadminSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(isOperatorLoingFail(error.response.data))
  }
};
export const doctorLogout = () => async () => {
  try {
    const { data } = await axios.post("/doctor/logout");
  } catch (error) {}
};
export const updateNowStatus = () => async (dispatch) => {
  dispatch(CompanyRequest());
  try {
    const { data } = await axios.get("/doctor/update/doctor/status");
    dispatch(CompanySuccess(data));
  } catch (error) {
    dispatch(CompanyFail());
  }
};

export const getDoctorNotification = () => async (dispatch, getState) => {
  dispatch(doctorNotificationRequest());
  try {
    const { data } = await axios.get(`/doctor/get/all/notification`);
    dispatch(doctorNotificationSuccess(data));
  } catch (error) {
    dispatch(doctorNotificationFail());
  }
};
export const seenDoctorNotification = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/doctor/notification/seen");
  } catch (error) {}
};
export const getDoctorAppointment = () => async (dispatch) => {
  dispatch(doctorNotificationRequest());
  try {
    const { data } = await axios.get("/doctor/get/consultation/appoint");
    dispatch(getAppointmentSuccess(data));
  } catch (error) {
    dispatch(doctorNotificationFail());
  }
};
export const submitPrescription = (id, info) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/doctor/submit/prescription/${id}`,
      info
    );
  } catch (error) {}
};


const generateMeetingId = () => {
  // Generate a random string or use a unique identifier library
  const randomString = Math.random().toString(36).substring(2, 8);

  // Combine with a prefix or any additional formatting as needed
  const meetingId = `meeting-${randomString}`;

  return meetingId;
};
export const getTokenVideo = ()=>async(dispatch)=>{
  try {
    
    const info = {
       apikey: "471a91aa-bae5-4c4c-9ed9-2719d74935df",
 permissions: [`allow_join`], 
 version: 2, //OPTIONAL
 roomId: generateMeetingId(), //OPTIONAL
 participantId: generateMeetingId(), //OPTIONAL 
 roles: ['crawler', 'rtc'], //OPTIONAL
    }
    const {data} = await axios.get("/admin/get-token",info);
    const d = {
      token:data.token,
      region:"dsffd"
    }
    const response = await axios.post("/admin/room/token",d);
    dispatch(getTokenSuccess(data))
  } catch (error) {
    
  }
}
export const doctorConnected = (id)=>async(dispatch)=>{
  try {
    const {data} = await axios.get(`/doctor/connected/${id}`)
  } catch (error) {
    
  }
}