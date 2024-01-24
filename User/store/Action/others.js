import axios from "@/Axios/axios";
import {
  getBlogSuccess,
  getDentalEquipmentFail,
  getDentalEquipmentRequest,
  getDentalEquipmentSuccess,
  getDentalFail,
  getDentalRequest,
  getDentalSuccess,
  getDoctorFail,
  getDoctorRequest,
  getDoctorSuccess,
  getEyeCareFail,
  getEyeCareRequest,
  getEyeCareSuccess,
  getEyeDoctorFail,
  getEyeDoctorRequest,
  getEyeDoctorSuccess,
  getEyeEquipmentFail,
  getEyeEquipmentRequest,
  getEyeEquipmentSuccess,
  getHomepageFail,
  getHomepageRequest,
  getHomepageSuccess,
  getLeadFail,
  getLeadRequest,
  getLeadSuccess,
  getPostSuccess,
  getPrescriptionFail,
  getPrescriptionRequest,
  getPrescriptionSuccess,
  getProductSuccess,
} from "../Reducer/others";

export const getHomePage = () => async (dispatch) => {
  dispatch(getHomepageRequest());

  try {
    const { data } = await axios.get("/other/get/homepage");
    dispatch(getHomepageSuccess(data));
  } catch (error) {
    dispatch(getHomepageFail());
  }
};

export const getDental = () => async (dispatch) => {
  dispatch(getDentalRequest());

  try {
    const { data } = await axios.get("/other/get/dental");
    dispatch(getDentalSuccess(data));
  } catch (error) {
    dispatch(getDentalFail());
  }
};
export const getDentalEquipments = (info)=>async(dispatch)=>{
  dispatch(getDentalEquipmentRequest());

  try {
    const {data} = await axios.get("/other/get/dental/equipment");
    dispatch(getDentalEquipmentSuccess(data));

  } catch (error) {
    dispatch(getDentalEquipmentFail());
    
  }
}
export const getEyeCare = (info)=>async(dispatch)=>{
  dispatch(getEyeCareRequest());

  try {
    const {data} = await axios.get("/other/get/eyecare");
    dispatch(getEyeCareSuccess(data));

  } catch (error) {
    dispatch(getEyeCareFail());
    
  }
}
export const getEyeDoctor = (info)=>async(dispatch)=>{
  dispatch(getEyeDoctorRequest());

  try {
    const {data} = await axios.get("/other/get/eye/doctor");
    dispatch(getEyeDoctorSuccess(data));

  } catch (error) {
    dispatch(getEyeDoctorFail());
    
  }
}
export const getEyeEquipments = (info)=>async(dispatch)=>{
  dispatch(getEyeEquipmentRequest());

  try {
    const {data} = await axios.get("/other/get/eye/equipment");
    dispatch(getEyeEquipmentSuccess(data));

  } catch (error) {
    dispatch(getEyeEquipmentFail());
    
  }
}
export const getDoctors = ()=>async(dispatch)=>{
  dispatch(getDoctorRequest());

  try {
    const {data} = await axios.get("/other/get/all/doctor");
    dispatch(getDoctorSuccess(data));

  } catch (error) {
    dispatch(getDoctorFail());
    
  }
}
// LEAD ROUTE
export const createLead = (info)=>async(dispatch)=>{
  dispatch(getLeadRequest());
  try {
    const {data} = await axios.post("/other/create/lead",info)
    dispatch(getLeadSuccess(data))
  } catch (error) {
    dispatch(getLeadFail());
  }
}
export const getProductById = (id)=>async(dispatch)=>{
  dispatch(getEyeEquipmentRequest())
try {
  const {data} = await axios.get(`/other/get/product/${id}`)
  dispatch(getProductSuccess(data))
} catch (error) {
  dispatch(getEyeEquipmentFail())
}
}

export const prescriptionDetail = (id)=>async(dispatch)=>{
  dispatch(getPrescriptionRequest())
  try {
    const {data} = await axios.get(`/other/prescription/${id}`);
    dispatch(getPrescriptionSuccess(data))
  } catch (error) {
    dispatch(getPrescriptionFail())
  }
}

export const getBlog = (id)=>async(dispatch)=>{

  try {
    const {data} = await axios.get(`/other/get/blog/${id}`);
    dispatch(getBlogSuccess(data))
  } catch (error) {
    
  }
}
export const getPost = (id)=>async(dispatch)=>{

  try {
    const {data} = await axios.get(`/other/get/post/${id}`);
    dispatch(getPostSuccess(data))
  } catch (error) {
    
  }
}