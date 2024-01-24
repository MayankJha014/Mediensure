import axios from "@/Axios/axios";
import {
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
  getPrescriptionFail,
  getPrescriptionRequest,
  getPrescriptionSuccess,
} from "../Reducer/other";

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
export const getDentalEquipments = (info) => async (dispatch) => {
  dispatch(getDentalEquipmentRequest());

  try {
    const { data } = await axios.get("/other/get/dental/equipment");
    dispatch(getDentalEquipmentSuccess(data));
  } catch (error) {
    dispatch(getDentalEquipmentFail());
  }
};
export const getEyeCare = (info) => async (dispatch) => {
  dispatch(getEyeCareRequest());

  try {
    const { data } = await axios.get("/other/get/eyecare");
    dispatch(getEyeCareSuccess(data));
  } catch (error) {
    dispatch(getEyeCareFail());
  }
};
export const getEyeDoctor = (info) => async (dispatch) => {
  dispatch(getEyeDoctorRequest());

  try {
    const { data } = await axios.get("/other/get/eye/doctor");
    dispatch(getEyeDoctorSuccess(data));
  } catch (error) {
    dispatch(getEyeDoctorFail());
  }
};
export const getEyeEquipments = (info) => async (dispatch) => {
  dispatch(getEyeEquipmentRequest());

  try {
    const { data } = await axios.get("/other/get/eye/equipment");
    dispatch(getEyeEquipmentSuccess(data));
  } catch (error) {
    dispatch(getEyeEquipmentFail());
  }
};
export const getDoctors = () => async (dispatch) => {
  dispatch(getDoctorRequest());

  try {
    const { data } = await axios.get("/other/get/all/doctor");
    dispatch(getDoctorSuccess(data));
  } catch (error) {
    dispatch(getDoctorFail());
  }
};
export const prescriptionDetail = (id) => async (dispatch) => {
  dispatch(getPrescriptionRequest());
  try {
    const { data } = await axios.get(`/other/prescription/${id}`);
    dispatch(getPrescriptionSuccess(data));
  } catch (error) {
    dispatch(getPrescriptionFail());
  }
};

const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN = process.env.NEXT_PUBLIC_REACT_APP_VIDEOSDK_TOKEN;
const API_AUTH_URL = process.env.REACT_APP_AUTH_URL;

export const getToken = async () => {
  if (VIDEOSDK_TOKEN && API_AUTH_URL) {
    console.error(
      "Error: Provide only ONE PARAMETER - either Token or Auth API"
    );
  } else if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: "GET",
    });
    const { token } = await res.json();
    return token;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const { roomId } = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error("error", error));

  return roomId;
};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const result = await fetch(url, options)
    .then((response) => response.json()) //result will have meeting id
    .catch((error) => console.error("error", error));

  return result ? result.roomId === roomId : false;
};
