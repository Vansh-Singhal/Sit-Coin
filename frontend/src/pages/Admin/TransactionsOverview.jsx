import useGetAllUsersTransactions from "@/hooks/useGetAllUsersTransactions";
import React, { useState } from "react";
import { FiSearch, FiDownload, FiCalendar } from "react-icons/fi";
import { useSelector } from "react-redux";

const TransactionsOverview = () => {
  const { transactions } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  const exportData = () => {
    // In a real app, this would generate and download a CSV/Excel file
    alert("Exporting transaction data...");
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.sender.fullname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.receiver.fullname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction._id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    const matchesDate = !dateFilter || transaction.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="bg-white/10 bg-opacity-10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold mb-2">
            Transactions Overview
          </h1>
          <p className="text-blue-100">
            View and manage all Sitcoin transactions
          </p>
        </div>
        <button
          onClick={exportData}
          className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <FiDownload size={16} />
          <span>Export Data</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, sender or receiver"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-gray-800 placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="reversed">Reversed</option>
          </select>
        </div>

        <div className="w-full md:w-48 relative">
          <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            value={dateFilter}
            onChange={handleDateFilter}
            className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-blue-300 border-opacity-30">
              <th className="px-4 py-3 text-blue-100 font-semibold">
                Transaction ID
              </th>
              <th className="px-4 py-3 text-blue-100 font-semibold">Amount</th>
              <th className="px-4 py-3 text-blue-100 font-semibold">Sender</th>
              <th className="px-4 py-3 text-blue-100 font-semibold">
                Receiver
              </th>
              <th className="px-4 py-3 text-blue-100 font-semibold hidden md:table-cell">
                Date
              </th>
              <th className="px-4 py-3 text-blue-100 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="border-b border-blue-300 border-opacity-10 hover:bg-gradient-to-r from-[#000428] to-[#004e92] hover:text-white"
              >
                <td className="px-4 py-3 text-white">{transaction._id}</td>
                <td className="px-4 py-3 text-white">
                  ₹{transaction.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-white">
                  <div>{transaction.sender.fullname}</div>
                  <div className="text-blue-200 text-xs">
                    {/* {transaction.senderAccount} */}
                  </div>
                </td>
                <td className="px-4 py-3 text-white">
                  <div>{transaction.receiver.fullname}</div>
                  <div className="text-blue-200 text-xs">
                    {transaction.receiverAccount}
                  </div>
                </td>
                <td className="px-4 py-3 text-white hidden md:table-cell">
                  {Date(transaction.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === "success"
                        ? "bg-green-500 bg-opacity-20 text-green-300"
                        : transaction.status === "failed"
                        ? "bg-red-500 bg-opacity-20 text-red-300"
                        : "bg-gray-500 bg-opacity-20 text-gray-300"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsOverview;
