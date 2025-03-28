import { fetchReversalsSuccess, fetchStart } from "@/redux/adminSlice";
import { ADMIN_API_ENDPOINT, USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllUsersReversals = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStart());
    const fetchReversalsInfo = async () => {
      try {
        const res = await axios.get(`${ADMIN_API_ENDPOINT}/reversals/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(fetchReversalsSuccess(res.data.reversals));
        }
      } catch (error) {
        dispatch(fetchFailure(error));
        console.warn(error);
      }
    };

    fetchReversalsInfo();
  }, []);
};

export default useGetAllUsersReversals;
