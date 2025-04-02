import { ADMIN_API_ENDPOINT } from "@/utils/constant.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BiQr, BiSolidBank } from "react-icons/bi";
import { FaPhone } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";

const calculateDaysSinceTransaction = (
  transactionCreatedAt,
  reversalCreatedAt
) => {
  const transactionDate = new Date(transactionCreatedAt);
  const requestDate = new Date(reversalCreatedAt);

  const timeDifference = requestDate - transactionDate;
  const daysSinceTransaction = Math.floor(timeDifference / (1000 * 3600 * 24));

  return daysSinceTransaction;
};

const calculateReversalsInLastSixMonths = (reversals) => {
  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  // Filter reversals that were requested in the last 6 months
  const recentReversals = reversals.filter(reversal => {
    const reversalDate = new Date(reversal.createdAt);
    return reversalDate >= sixMonthsAgo && reversalDate <= currentDate;
  });

  return recentReversals.length;
};

const ReversalInfo = ({ request }) => {
  const [reversals, setReversals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = request.user;
  const transaction = request.transactionID;

  useEffect(() => {
    const fetchReversals = async () => {
      try {
        const res = await axios.get(
          `${ADMIN_API_ENDPOINT}/reversals/get/${user._id}`,
          {
            withCredentials: true,
          }
        );
        setReversals(res.data.reversals);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchReversals();
  }, [user._id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  const timeSinceTransaction = calculateDaysSinceTransaction(
    transaction.createdAt,
    request.createdAt
  );
  const RTD = parseFloat((7 - timeSinceTransaction) / 7).toFixed(2);

  const reversalsInLastSixMonths = calculateReversalsInLastSixMonths(reversals);
  const customerReversalFrequency = `${reversalsInLastSixMonths} reversal / 6 months`;
  
  const CRF = parseFloat(reversalsInLastSixMonths / 6).toFixed(2);

  const transactionAmount = transaction.amount;
  const TA = parseFloat(transactionAmount / 100000).toFixed(2);

  const overallCredibilityScore = Math.max(parseFloat((1-TA) + (1 - CRF) + (RTD)).toFixed(2),0);

  const decision = overallCredibilityScore >= 1.0 ? "Approved" : "Rejected";
  console.log();
  return (
    <div className="border-t border-gray-200">
      <dl>
        <div className="bg-gray-50 px-4 py-2 md:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">User ID</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {user._id}
          </dd>
        </div>
        <div className="bg-white px-4 py-2 md:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Transaction ID</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {transaction._id}
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-2 md:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Reversal Reason</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {request.reason}
          </dd>
        </div>
        <div className="bg-white px-4 py-2 md:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Reversal Time Delay (RTD)
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {timeSinceTransaction} days
            <div className="mt-2 text-xs text-gray-500">
              TimeCredibilityScore: {RTD}
            </div>
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-2 md:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Customer Reversal Frequency (CRF)
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {customerReversalFrequency}
            <div className="mt-2 text-xs text-gray-500">
              CRF_CredibilityScore: {CRF}
            </div>
          </dd>
        </div>
        <div className="bg-white px-4 py-2 md:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Transaction Amount (TA)
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            ₹ {transactionAmount}
            <div className="mt-2 text-xs text-gray-500">RiskScore_TA: {TA}</div>
          </dd>
        </div>
        <div className="bg-white px-4 py-2 md:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Overall Credibility Score
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {overallCredibilityScore}
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-2 md:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Mode</dt>
          <dd className="mt-1 text-sm md:text-xl text-gray-900 sm:mt-0 sm:col-span-2 h-full">
            {transaction.mode === "qr" ? <BiQr /> : transaction.mode === "contact" ? <IoMdPhonePortrait /> : <BiSolidBank/>}
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-2 md:py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Decision</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span className="px-2 py-1 font-semibold leading-tight inline-flex items-center rounded-full bg-green-100 text-green-700">
              {decision}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ReversalInfo;
