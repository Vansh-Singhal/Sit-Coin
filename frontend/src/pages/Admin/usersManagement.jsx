import useGetAllUsers from "@/hooks/useGetAllUsers";
import React, { useState } from "react";
import { FiSearch, FiUserX, FiUserCheck } from "react-icons/fi";
import { useSelector } from "react-redux";

const UsersManagement = () => {
  
  const { users } = useSelector((state)=>state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const toggleUserStatus = (userId) => {
    // In a real app, this would make an API call
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status: user.status === "active" ? "blocked" : "active",
          };
        }
        return user;
      })
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.account_number.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white/10 bg-opacity-10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-2">Users Management</h1>
        <p className="text-blue-100">View and manage all Sitcoin users</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or account number"
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
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="blocked">Blocked Users</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-blue-300 border-opacity-30">
              <th className="px-4 py-3 text-blue-100 font-semibold">Name</th>
              <th className="px-4 py-3 text-blue-100 font-semibold">Email</th>
              <th className="px-4 py-3 text-blue-100 font-semibold hidden md:table-cell">
                Contact
              </th>
              <th className="px-4 py-3 text-blue-100 font-semibold hidden md:table-cell">
                Account Number
              </th>
              <th className="px-4 py-3 text-blue-100 font-semibold">Status</th>
              <th className="px-4 py-3 text-blue-100 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-blue-300 border-opacity-10 hover:bg-gradient-to-r from-[#000428] to-[#004e92] hover:text-white"
              >
                <td className="px-4 py-3 text-white">{user.fullname}</td>
                <td className="px-4 py-3 text-white">{user.email}</td>
                <td className="px-4 py-3 text-white hidden md:table-cell">
                  {user.contact}
                </td>
                <td className="px-4 py-3 text-white hidden md:table-cell">
                  {user.account_number}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-500 bg-opacity-20 text-green-300"
                        : "bg-red-500 bg-opacity-20 text-red-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                      user.status === "active"
                        ? "bg-red-500 bg-opacity-20 text-red-300 hover:bg-opacity-30"
                        : "bg-green-500 bg-opacity-20 text-green-300 hover:bg-opacity-30"
                    }`}
                  >
                    {user.status === "active" ? (
                      <>
                        <FiUserX size={14} />
                        <span>Block</span>
                      </>
                    ) : (
                      <>
                        <FiUserCheck size={14} />
                        <span>Unblock</span>
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
