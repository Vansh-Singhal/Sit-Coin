import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  BiSearch,
  BiFilterAlt,
  BiRefresh,
  BiCheck,
  BiQr,
  BiMobile,
  BiSolidBank,
  BiTime,
  BiX,
} from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REVERSAL_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { addReversal } from "@/redux/reversalSlice";
import { toast } from "react-toastify";

const Reversals = () => {
  return (
    <>
      <Header />
      <ReversalsMain />
      <Footer />
    </>
  );
};

const isWithinLast7Days = (date) => {
  const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
  return new Date(date) >= sevenDaysAgo;
};

const ReversalsMain = () => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  let { user } = useSelector((state) => state.auth);
  let { transactions } = useSelector((state) => state.transactions);
  let { reversals } = useSelector((state) => state.reversals);

  const EnhancedTransactions = transactions
    .filter(
      (transaction) =>
        transaction.status !== "failed" &&
        transaction.sender._id === user?._id &&
        isWithinLast7Days(transaction.createdAt)
    )
    .map((transaction) => {
      const reversal = reversals.find(
        (reversal) => reversal.transactionID === transaction._id
      );
      return {
        ...transaction,
        reversalStatus: reversal ? reversal.status : null,
      };
    });

  const handleReversalRequest = async (transactionId) => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for the reversal.");
      return;
    }

    const formData = {
      transactionID: transactionId,
      reason,
    };

    try {
      const res = await axios.post(
        `${REVERSAL_API_ENDPOINT}/create`,
        formData,
        {
          withCredentials: true,
        }
      );

      dispatch(addReversal(res.data.reversal));
      toast.success("Reversal Requested Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Request failed");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">Payment Reversals</h1>
            <p className="text-gray-300">Request and track payment reversals</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-white/10 hover:bg-white/20 text-white gap-2">
              <BiFilterAlt className="h-5 w-5" />
              Filter
            </Button>
            <Button className="bg-white/10 hover:bg-white/20 text-white gap-2">
              <BiRefresh className="h-5 w-5" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            className="w-full pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            placeholder="Search by transaction ID or merchant..."
          />
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-xl backdrop-blur-md bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
          <FiAlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
          <p className="text-sm text-gray-300">
            Payment reversals can be requested within 7 days of the transaction.
            Processing may take 3-5 business days.
          </p>
        </div>

        {/* Reversals List */}
        <div className="rounded-xl backdrop-blur-lg bg-white/10 border border-white/20">
          {/* Table Header */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4 border-b border-white/10 text-sm text-gray-300">
            <div>Transaction Details</div>
            <div className="hidden lg:block">Transaction ID</div>
            <div className="hidden sm:block">Date</div>
            <div className="hidden lg:block">Status</div>
            <div>Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/10">
            {EnhancedTransactions.map((request) => (
              <div
                key={request._id}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4 items-center hover:bg-white/5"
              >
                {/* Transaction Details */}
                <div className="flex items-center gap-3 col-span-1">
                  <div className="p-2 rounded-full bg-white/10 text-blue-300">
                    {request.mode === "qr" ? (
                      <BiQr />
                    ) : request.mode === "contact" ? (
                      <BiMobile />
                    ) : (
                      <BiSolidBank />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {request.receiver.fullname}
                    </p>
                    {
                      <p className="text-sm text-red-400">
                        - ₹{request.amount}
                      </p>
                    }
                  </div>
                </div>

                {/* Transaction ID (hidden on small screens) */}
                <div className="text-gray-300 text-sm hidden lg:block">
                  {request._id}
                </div>

                {/* Date */}
                <div className="text-gray-300 text-sm hidden sm:block">
                  {new Date(request.createdAt).toLocaleString()}
                </div>

                {/* Status (hidden on small screens) */}
                <div className="hidden lg:block">
                  {request.status === "reversed" ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                      Reversed
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                      Eligible
                    </span>
                  )}
                </div>

                {/* Action */}
                <div>
                  {!request.reversalStatus ? (
                    <div>
                      <Button
                        className="bg-white hover:bg-white/70 text-black text-sm mt-4"
                        onClick={() => setIsCollapsibleOpen(!isCollapsibleOpen)} // Open the collapsible when clicked
                      >
                        Request Reversal
                      </Button>

                      <Collapsible
                        open={isCollapsibleOpen}
                        onOpenChange={setIsCollapsibleOpen}
                      >
                        <CollapsibleContent>
                          <div className="mt-4">
                            <Input
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              className="bg-white/5 text-white border-white/10"
                              placeholder="Enter the reason for reversal"
                            />
                          </div>

                          {/* Submit Button to Confirm Reversal Request */}
                          <div className="mt-4">
                            <Button
                              className="bg-green-500 text-white text-sm"
                              onClick={() =>
                                handleReversalRequest(request._id)
                              }
                            >
                              Submit Request
                            </Button>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ) : request.reversalStatus === "pending" ? (
                    <Button
                      variant="outline"
                      className="border-yellow-500/30 text-yellow-400 text-sm hover:bg-white/70"
                    >
                      <BiTime className="mr-1 h-4 w-4" /> Request Pending
                    </Button>
                  ) : request.reversalStatus === "accepted" ? (
                    <Button
                      variant="outline"
                      className="border-green-500/30 text-green-400 text-sm hover:bg-white/70"
                    >
                      <BiCheck className="mr-1 h-4 w-4" /> Request Accepted
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-400 text-sm hover:bg-white/70"
                    >
                      <BiX className="mr-1 h-4 w-4" /> Request Rejected
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reversal Policy */}
        <div className="rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Reversal Policy
          </h2>
          <div className="space-y-3 text-sm text-gray-300">
            <p>
              • Reversals can only be requested for eligible transactions within
              7 days
            </p>
            <p>
              • Once approved, funds will be credited back to your account
              within 3-5 business days
            </p>
            <p>• Rejected reversal requests cannot be resubmitted</p>
            <p>• For any assistance, please contact our customer support</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Reversals;
