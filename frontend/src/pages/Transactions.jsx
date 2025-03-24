import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiSearch, BiFilterAlt, BiDownload } from "react-icons/bi";
import React from "react";
import { useSelector } from "react-redux"; // Assuming you are using Redux for state management

const Transactions = () => {
  return (
    <>
      <Header />
      <TransactionsMain />
      <Footer />
    </>
  );
};

const TransactionsMain = () => {
  const { transactions } = useSelector((state) => state.transactions);  // Assuming you're fetching transactions from Redux store
  const { user } = useSelector((state) => state.auth);  // Assuming user info is in Redux store

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white">Transactions</h1>
            <p className="text-gray-300">
              View and manage your transaction history
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-white/10 hover:bg-white/20 text-white gap-2">
              <BiFilterAlt className="h-5 w-5" /> Filter
            </Button>
            <Button className="bg-white/10 hover:bg-white/20 text-white gap-2">
              <BiDownload className="h-5 w-5" /> Export
            </Button>
          </div>
        </div>

        <div className="relative">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            className="w-full pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            placeholder="Search transactions..."
          />
        </div>

        <div className="rounded-xl backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b border-white/10 text-sm text-gray-300">
            <div>Type</div>
            <div>Details</div>
            <div>Amount</div>
            <div>Status</div>
          </div>

          <div className="divide-y divide-white/10">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 items-center hover:bg-white/5"
              >
                <div>
                  <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-gray-300">
                    {transaction.sender._id === user._id ? "Sent" : "Received"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-white">
                    {transaction.sender.fullname} to {transaction.receiver.fullname}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </p>
                </div>
                <div
                  className={`font-medium ${
                    transaction.sender._id === user._id
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  ₹{transaction.amount}
                </div>
                <div>
                  <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-gray-300">
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Transactions;
