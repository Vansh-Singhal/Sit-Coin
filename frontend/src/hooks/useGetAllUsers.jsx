import { fetchStart, fetchUsersSuccess } from "@/redux/adminSlice";
import { updateBalance } from "@/redux/authSlice";
import { ADMIN_API_ENDPOINT, USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStart());
    const fetchUsersInfo = async () => {
      try {
        const res = await axios.get(`${ADMIN_API_ENDPOINT}/users/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(fetchUsersSuccess(res.data.users));
        }
      } catch (error) {
        dispatch(fetchFailure(error));
        console.warn(error);
      }
    };

    fetchUsersInfo();
  }, []);
};

export default useGetAllUsers;
