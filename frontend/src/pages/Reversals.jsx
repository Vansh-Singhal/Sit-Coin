import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BiSearch,
  BiFilterAlt,
  BiRefresh,
  BiTime,
  BiCheck,
  BiX,
} from "react-icons/bi";
import {
  FiShoppingBag,
  FiCoffee,
  FiHome,
  FiSmartphone,
  FiCreditCard,
  FiAlertCircle,
  FiClock,
} from "react-icons/fi";
import React from "react";
import { useSelector } from "react-redux";

const Reversals = () => {
  return (
    <>
      <Header />
      <ReversalsMain />
      <Footer />
    </>
  );
};

const ReversalsMain = () => {
  let { transactions } = useSelector((state)=> state.transactions);
  transactions = transactions.filter((item)=>item.status !== "failed");

  const reversalRequests = [
    {
      id: 1,
      name: "Amazon Shopping",
      amount: "₹1,200",
      date: "Today, 11:20 AM",
      category: "Shopping",
      status: "Eligible",
      icon: <FiShoppingBag />,
      transactionId: "TXN123456789",
      requestStatus: null,
    },
    {
      id: 2,
      name: "Electric Bill",
      amount: "₹2,000",
      date: "Yesterday, 6:45 PM",
      category: "Utilities",
      status: "Eligible",
      icon: <FiHome />,
      transactionId: "TXN987654321",
      requestStatus: null,
    },
    {
      id: 3,
      name: "Starbucks Coffee",
      amount: "₹350",
      date: "24 Feb, 9:30 AM",
      category: "Food & Drinks",
      status: "Processing",
      icon: <FiCoffee />,
      transactionId: "TXN456789123",
      requestStatus: "processing",
    },
    {
      id: 4,
      name: "Mobile Recharge",
      amount: "₹799",
      date: "23 Feb, 5:20 PM",
      category: "Utilities",
      status: "Approved",
      icon: <FiSmartphone />,
      transactionId: "TXN789123456",
      requestStatus: "approved",
    },
    {
      id: 5,
      name: "Credit Card Payment",
      amount: "₹5,000",
      date: "22 Feb, 4:45 PM",
      category: "Bills",
      status: "Rejected",
      icon: <FiCreditCard />,
      transactionId: "TXN321654987",
      requestStatus: "rejected",
      rejectionReason: "Past the eligible time window",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "processing":
        return <FiClock className="h-5 w-5 text-yellow-400" />;
      case "approved":
        return <BiCheck className="h-5 w-5 text-green-400" />;
      case "rejected":
        return <BiX className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "processing":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
            Processing
          </span>
        );
      case "approved":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
            Eligible
          </span>
        );
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
        <div className="rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_auto_auto_auto_auto] gap-4 p-4 border-b border-white/10 text-sm text-gray-300">
            <div>Transaction Details</div>
            <div className="hidden md:block">Transaction ID</div>
            <div className="hidden md:block">Date</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/10">
            {transactions.map((request) => (
              <div
                key={request._id}
                className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_auto_auto_auto_auto] gap-4 p-4 items-center hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white/10">
                    {request.mode}
                  </div>
                  <div>
                    <p className="font-medium text-white">{request.sender.fullname}</p>
                    <p className="text-sm text-red-400">-{request.amount}</p>
                  </div>
                </div>

                <div className="hidden md:block text-gray-300 text-sm">
                  {request._id}
                </div>

                <div className="hidden md:block text-gray-300 text-sm">
                {new Date(request.createdAt).toLocaleString()}
                </div>

                <div className="flex items-center gap-2">
                  {getStatusIcon(request.requestStatus)}
                  {getStatusBadge(request.requestStatus)}
                </div>

                <div>
                  {!request.requestStatus ? (
                    <Button className="bg-white/10 hover:bg-white/20 text-white text-sm">
                      Request Reversal
                    </Button>
                  ) : request.requestStatus === "processing" ? (
                    <Button
                      variant="outline"
                      className="border-yellow-500/30 text-yellow-400 text-sm hover:bg-yellow-500/10"
                    >
                      <BiTime className="mr-1 h-4 w-4" /> View Status
                    </Button>
                  ) : request.requestStatus === "approved" ? (
                    <Button
                      variant="outline"
                      className="border-green-500/30 text-green-400 text-sm hover:bg-green-500/10"
                    >
                      <BiCheck className="mr-1 h-4 w-4" /> Completed
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-400 text-sm hover:bg-red-500/10"
                    >
                      <FiAlertCircle className="mr-1 h-4 w-4" /> View Details
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

        {/* Pagination */}
        <div className="flex justify-between items-center text-gray-300 text-sm">
          <p>Showing 5 of 12 transactions</p>
          <div className="flex gap-2">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Previous
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Next
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Reversals;
