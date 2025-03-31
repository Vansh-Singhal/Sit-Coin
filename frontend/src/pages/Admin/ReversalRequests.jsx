import React, { useState } from "react";
import { FiSearch, FiCheck, FiX } from "react-icons/fi";
import { FaExclamation } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { REVERSAL_API_ENDPOINT } from "@/utils/constant";
import { toast } from "react-toastify";
import axios from "axios";
import { updateReversal } from "@/redux/adminSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Reversals = () => {
  const { reversals } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  let filteredRequests = reversals.filter((request) => {
    const matchesSearch =
      request.user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleRequest = async (requestId, action) => {
    const url = `${REVERSAL_API_ENDPOINT}/${action}/${requestId}`;
    try {
      const res = await axios.get(url, {
        withCredentials: true,
      });

      if (res.data.success) {
        filteredRequests = filteredRequests.map((request) =>
          request._id === requestId
            ? {
                ...request,
                status: action === "accept" ? "accepted" : "rejected",
              }
            : request
        );
        dispatch(updateReversal(filteredRequests));
        toast.success("Updated Successfully");
      } else {
        toast.error(`Failed to ${action} request`);
        console.error(`Failed to ${action} request`);
      }
    } catch (error) {
      toast.error(`Failed to ${action} request`);
      console.error(`Error ${action}ing request:`, error);
    }
  };

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
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
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
                key={request._id}
                className="border-b border-blue-300 border-opacity-10 hover:bg-gradient-to-r from-[#000428] to-[#004e92] hover:text-white"
              >
                <td className="px-4 py-3 text-white">{request._id}</td>
                <td className="px-4 py-3 text-white">
                  <div>{request.user.fullname}</div>
                  <div className="text-blue-200 text-xs">
                    {request.userAccount}
                  </div>
                </td>
                <td className="px-4 py-3 text-white hidden md:table-cell">
                  {request.transactionID._id}
                </td>
                <td className="px-4 py-3 text-white">
                  ₹{request.transactionID.amount}
                </td>
                <td className="px-4 py-3 text-white hidden md:table-cell">
                  {request.reason}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === "pending"
                        ? "bg-yellow-500 bg-opacity-20 text-yellow-300"
                        : request.status === "accepted"
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
                          title="Approve Request"
                          className="p-1.5 bg-green-500 bg-opacity-20 text-green-300 rounded-lg hover:bg-opacity-30"
                          onClick={() => handleRequest(request._id, "accept")}
                        >
                          <FiCheck size={16} />
                        </button>
                        <button
                          title="Deny Request"
                          className="p-1.5 bg-red-500 bg-opacity-20 text-red-300 rounded-lg hover:bg-opacity-30"
                          onClick={() => handleRequest(request._id, "decline")}
                        >
                          <FiX size={16} />
                        </button>
                      </>
                    )}
                    <button
                      title="Info"
                      className="p-1.5 bg-gray-500 bg-opacity-20 text-white rounded-lg hover:bg-opacity-30"
                      onClick={() => {
                        setSelectedRequest(request);
                        setIsOpen(true);
                      }}
                    >
                      <FaExclamation size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {selectedRequest && (
          <DialogContent className="p-4 bg-white rounded-lg shadow-lg max-w-sm w-full">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">
                {selectedRequest._id}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <span className="text-gray-600 mb-2">
                <strong>Sender:</strong> {selectedRequest.user.fullname}
                <br />
                <strong>Transaction ID:</strong>{" "}
                {selectedRequest.transactionID._id}
                <br />
                <strong>Reason:</strong> {selectedRequest.reason}
                <br />
                <strong>Amount:</strong> ₹{selectedRequest.transactionID.amount}
                <br />
                <strong>Status:</strong> {selectedRequest.status}
                <br />
                <strong>Mode:</strong> {selectedRequest.transactionID.mode}
                <br />
                <strong>Date:</strong>{" "}
                {new Date(selectedRequest.createdAt).toLocaleDateString()}
              </span>
            </DialogDescription>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="w-full text-white hover:text-white bg-[#000428] hover:bg-[#000] cursor-pointer"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Reversals;
