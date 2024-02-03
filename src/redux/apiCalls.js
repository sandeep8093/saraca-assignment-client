import { loginFailure, loginStart, loginSuccess,registerFailure,registerSuccess,registerStart,logOut,deleteProfile } from "./userRedux";
import { publicRequest,userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    const { token } = res.data; 
    localStorage.setItem('token', token);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/signup", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const logout = async (dispatch) => {
    dispatch(logOut());
 
};
