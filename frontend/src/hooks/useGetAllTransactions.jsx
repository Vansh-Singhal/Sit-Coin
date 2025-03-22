import { fetchTransactionsStart, fetchTransactionsSuccess } from "@/redux/transactionSlice";
import { TRANSACTION_API_ENDPOINT } from "@/utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllTransactions = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        dispatch(fetchTransactionsStart())

        const res = await axios.get(`${TRANSACTION_API_ENDPOINT}/verify/${userId}`, {
          withCredentials: true,
        });

        if (res.data.success){
            dispatch(fetchTransactionsSuccess(res.data.transaction))
        }
      } catch (error) {
        console.warn(error);
      }
    };
  }, []);
};

export default useGetAllTransactions;
