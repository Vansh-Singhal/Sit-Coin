import React, { useState } from "react";
import {
  FiUsers,
  FiRefreshCcw,
  FiDollarSign,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";
import UsersManagement from "./usersManagement.jsx";
import TransactionsOverview from "./TransactionsOverview.jsx";
import ReversalRequests from "./ReversalRequests.jsx";
import AdminSettings from "./AdminSettings.jsx";
import useGetAllUsers from "@/hooks/useGetAllUsers.jsx";
import useGetAllUsersTransactions from "@/hooks/useGetAllUsersTransactions.jsx";
import useGetAllUsersReversals from "@/hooks/useGetAllUsersReversal.jsx";

const AdminDashboard = () => {
  useGetAllUsers();
  useGetAllUsersTransactions();
  useGetAllUsersReversals();


  return (
    <div>
      <AdminDashboardMain />
    </div>
  );
};

const AdminDashboardMain = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UsersManagement />;
      case "transactions":
        return <TransactionsOverview />;
      case "reversals":
        return <ReversalRequests />;
      case "settings":
        return <AdminSettings />;
      default:
        return <UsersManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92] p-6">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h1 className="text-white text-xl font-bold">Sitcoin Admin</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-2 rounded-md hover:bg-blue-800"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`lg:block ${
            sidebarOpen ? "block" : "hidden"
          } lg:w-64 w-full`}
        >
          <div className="bg-white/10 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
            <h2 className="text-white text-xl font-bold mb-6 hidden lg:block">
              Sitcoin Admin
            </h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab("users")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === "users"
                        ? "bg-blue-700 text-white"
                        : "text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-black"
                    }`}
                  >
                    <FiUsers className="text-lg" />
                    <span>Users Management</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("transactions")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === "transactions"
                        ? "bg-blue-700 text-white"
                        : "text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-black"
                    }`}
                  >
                    <FiDollarSign className="text-lg" />
                    <span>Transactions</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("reversals")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === "reversals"
                        ? "bg-blue-700 text-white"
                        : "text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-black"
                    }`}
                  >
                    <FiRefreshCcw className="text-lg" />
                    <span>Reversal Requests</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === "settings"
                        ? "bg-blue-700 text-white"
                        : "text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-black"
                    }`}
                  >
                    <FiSettings className="text-lg" />
                    <span>Settings</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
