import React, { useState } from "react";
import { FiSearch, FiCheck, FiX, FiBell } from "react-icons/fi";

// Mock data for reversal requests
const mockReversalRequests = [
  {
    id: "REV001",
    user: "John Doe",
    userAccount: "SITC0001234",
    transactionId: "TXN001",
    amount: 1500,
    reason: "Wrong recipient",
    status: "pending",
    date: "2023-05-16",
  },
  {
    id: "REV002",
    user: "Jane Smith",
    userAccount: "SITC0001235",
    transactionId: "TXN004",
    amount: 3000,
    reason: "Fraudulent transaction",
    status: "approved",
    date: "2023-05-17",
  },
  {
    id: "REV003",
    user: "Mike Johnson",
    userAccount: "SITC0001236",
    transactionId: "TXN002",
    amount: 2000,
    reason: "Service not received",
    status: "denied",
    date: "2023-05-17",
  },
  {
    id: "REV004",
    user: "Sarah Williams",
    userAccount: "SITC0001237",
    transactionId: "TXN005",
    amount: 1000,
    reason: "Duplicate payment",
    status: "pending",
    date: "2023-05-18",
  },
];

const ReversalRequests = () => {
  const [reversalRequests, setReversalRequests] =
    useState(mockReversalRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const approveRequest = (requestId) => {
    // In a real app, this would make an API call
    setReversalRequests(
      reversalRequests.map((request) => {
        if (request.id === requestId) {
          return {
            ...request,
            status: "approved",
          };
        }
        return request;
      })
    );

    // Simulate sending notification
    alert(
      `Notification sent to user: Your reversal request ${requestId} has been approved.`
    );
  };

  const denyRequest = (requestId) => {
    // In a real app, this would make an API call
    setReversalRequests(
      reversalRequests.map((request) => {
        if (request.id === requestId) {
          return {
            ...request,
            status: "denied",
          };
        }
        return request;
      })
    );

    // Simulate sending notification
    alert(
      `Notification sent to user: Your reversal request ${requestId} has been denied.`
    );
  };

  const sendNotification = (requestId) => {
    // In a real app, this would make an API call to send a notification
    alert(`Additional notification sent for request ${requestId}`);
  };

  const filteredRequests = reversalRequests.filter((request) => {
    const matchesSearch =
      request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white/10 bg-opacity-10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-2">
          Reversal Requests
        </h1>
        <p className="text-blue-100">
          Manage payment reversal requests from users
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, user or transaction"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-gray-500 placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-blue-300 border-opacity-30">
              <th className="px-4 py-3 text-blue-100 font-semibold">
                Request ID
              </th>
              <th className="px-4 py-3 text-blue-100 font-semibold">User</th>
              <th className="px-4 py-3 text-blue-100 font-semibold hidden md:table-cell">
                Transaction
              </th>
              <th className="px-4 py-3 text-blue-100 font-semibold">Amount</th>
              <th className="px-4 py-3 text-blue-100 font-semibold hidden md:table-cell">
                Reason
              </th>
              <th className="px-4 py-3 text-blue-100 font-semibold">Status</th>
              <th className="px-4 py-3 text-blue-100 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-blue-300 border-opacity-10 hover:bg-gradient-to-r from-[#000428] to-[#004e92] hover:text-white"
              >
                <td className="px-4 py-3 text-white">{request.id}</td>
                <td className="px-4 py-3 text-white">
                  <div>{request.user}</div>
                  <div className="text-blue-200 text-xs">
                    {request.userAccount}
                  </div>
                </td>
                <td className="px-4 py-3 text-white hidden md:table-cell">
                  {request.transactionId}
                </td>
                <td className="px-4 py-3 text-white">
                  ₹{request.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-white hidden md:table-cell">
                  {request.reason}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === "pending"
                        ? "bg-yellow-500 bg-opacity-20 text-yellow-300"
                        : request.status === "approved"
                        ? "bg-green-500 bg-opacity-20 text-green-300"
                        : "bg-red-500 bg-opacity-20 text-red-300"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {request.status === "pending" && (
                      <>
                        <button
                          onClick={() => approveRequest(request.id)}
                          title="Approve Request"
                          className="p-1.5 bg-green-500 bg-opacity-20 text-green-300 rounded-lg hover:bg-opacity-30"
                        >
                          <FiCheck size={16} />
                        </button>
                        <button
                          onClick={() => denyRequest(request.id)}
                          title="Deny Request"
                          className="p-1.5 bg-red-500 bg-opacity-20 text-red-300 rounded-lg hover:bg-opacity-30"
                        >
                          <FiX size={16} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => sendNotification(request.id)}
                      title="Send Notification"
                      className="p-1.5 bg-blue-500 bg-opacity-20 text-blue-300 rounded-lg hover:bg-opacity-30"
                    >
                      <FiBell size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReversalRequests;
