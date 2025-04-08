import { updateBalance } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetUserBalance = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/get/balance`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(updateBalance(res.data.balance));
        }
      } catch (error) {
        console.warn(error);
      }
    };

    fetchUserInfo();
  }, []);
};

export default useGetUserBalance;
