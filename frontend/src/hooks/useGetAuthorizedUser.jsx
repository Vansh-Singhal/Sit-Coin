import { loginFailure, loginStart, loginSuccess } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";
  import axios from "axios";
  import React, { useEffect } from "react";
  import { useDispatch } from "react-redux";
  
  const useGetAuthorizedUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          dispatch(loginStart());
  
          const res = await axios.post(`${USER_API_ENDPOINT}/login`, formData, {
            withCredentials: true,
          });
  
          if (res.data.success) {
            console.log(res.data);
            dispatch(loginSuccess(res.data));
          }
        } catch (error) {
            dispatch(loginFailure(err.response?.data?.message || "Login failed"));
        }
      };
  
      fetchUserInfo();
    }, []);
  };
  
  export default useGetAuthorizedUser;
  