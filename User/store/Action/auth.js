import axios from "@/Axios/axios.js";
import {
  fail,
  getConsultation,
  getNetworkFail,
  getNetworkRequest,
  getNetworkSuccess,
  getOffConsultation,
  isUser,
  isUserFail,
  isUserRequest,
  request,
  success,
} from "../Reducer/auth";

export const checkUser = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.get("/user/user");
    dispatch(isUser(data));
  } catch (error) {
    dispatch(isUserRequest());
  }
};
export const registerUser = (info) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/register", info);
  } catch (error) {}
};
export const loginUser = (info) => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.post("/user/login", info);
    dispatch(isUser(data));
  } catch (error) {
    dispatch(isUserFail());
  }
};
export const logoutUser = (info) => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.post("/user/signout", info);
    dispatch(isUser(data));
  } catch (error) {
    dispatch(isUserFail());
  }
};
// BOOK CONSULTATION

export const bookConsultation = (id, info) => async (dispatch) => {
  dispatch(request());
  try {
    const { data } = await axios.post(`/user/book/consultation/${id}`, info);
    dispatch(success(data));
  } catch (error) {
    dispatch(fail(error.response.data));
  }
};

export const getAllConsultation = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.get("/user/get/consultation");
    dispatch(getConsultation(data));
  } catch (error) {
    dispatch(isUserFail());
  }
};
export const getAllOfflineConsultation = () => async (dispatch) => {
  dispatch(isUserRequest());
  try {
    const { data } = await axios.get("/user/get/offline/consultation");
    dispatch(getOffConsultation(data));
  } catch (error) {
    dispatch(isUserFail());
  }
};
export const getNetwork = (pin) => async (dispatch) => {
  dispatch(getNetworkRequest());
  try {
    const { data } = await axios.get(`/network/get/doctors/${pin}`);
    dispatch(getNetworkSuccess(data));
  } catch (error) {
    dispatch(getNetworkFail());
  }
};

export const bookConsultationNetwork = (id, info) => async (dispatch) => {
  dispatch(request());

  try {
    const { data } = await axios.post(`/network/book/consultation/${id}`, info);
    dispatch(success(data));
  } catch (error) {
    dispatch(fail(error.response.data));
  }
};
