import {
  fetchTransactionsFailure,
  fetchTransactionsStart,
  fetchTransactionsSuccess,
} from "@/redux/transactionSlice";
import { TRANSACTION_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllTransactions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        dispatch(fetchTransactionsStart());

        const res = await axios.get(`${TRANSACTION_API_ENDPOINT}/get/all`, {
          withCredentials: true,
        });

        if (res.data.success) {
          console.log(res.data);
          dispatch(fetchTransactionsSuccess(res.data.transactions));
        }
      } catch (error) {
        dispatch(
          fetchTransactionsFailure(
            error.response?.data?.message || "Fetching trasactions failed"
          )
        );
      }
    };

    fetchAllTransactions();
  }, []);
};

export default useGetAllTransactions;
