import {
  clearReversals,
  fetchReversalsFailure,
  fetchReversalsStart,
  fetchReversalsSuccess,
} from "@/redux/reversalSlice";
import { REVERSAL_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllReversals = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllReversals = async () => {
      try {
        dispatch(fetchReversalsStart());

        const res = await axios.get(`${REVERSAL_API_ENDPOINT}/get/all`, {
          withCredentials: true,
        });

        if (res.data.success) {
          console.log(res.data);
          dispatch(fetchReversalsSuccess(res.data.reversals));
        }
      } catch (error) {
        dispatch(
          fetchReversalsFailure(
            error.response?.data?.message || "Fetching reversals failed"
          )
        );
      }
    };
    dispatch(clearReversals());
    fetchAllReversals();
  }, []);
};

export default useGetAllReversals;
