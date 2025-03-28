import { fetchStart, fetchTransactionsSuccess } from "@/redux/adminSlice";
import { updateBalance } from "@/redux/authSlice";
import { ADMIN_API_ENDPOINT, USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllUsersTransactions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStart());
    const fetchTransactionsInfo = async () => {
      try {
        const res = await axios.get(`${ADMIN_API_ENDPOINT}/transactions/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(fetchTransactionsSuccess(res.data.transactions));
        }
      } catch (error) {
        dispatch(fetchFailure(error));
        console.warn(error);
      }
    };

    fetchTransactionsInfo();
  }, []);
};

export default useGetAllUsersTransactions;
