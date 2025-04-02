  import { ADMIN_API_ENDPOINT } from "@/utils/constant";
  import axios from "axios";
  import React, { useEffect } from "react";
  import { useDispatch } from "react-redux";
  
  const useGetAllReversals = () => {
    const fetchAllReversals = async () => {
    try {
        const res = await axios.get(`${ADMIN_API_ENDPOINT}/reversals/get/`, {
        withCredentials: true,
        });

        if (res.data.success) {
        console.log(res.data);
        }
    } catch (error) {
        console.error(error);
    }
    };
    fetchAllReversals();
  };
  
  export default useGetAllReversals;
  