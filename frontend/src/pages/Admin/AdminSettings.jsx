import React, { useState } from "react";
import { FiSave, FiEye, FiEyeOff } from "react-icons/fi";

const AdminSettings = () => {
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@sitcoin.com",
    phone: "+91 9876543200",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [notification, setNotification] = useState(null);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const updateProfile = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call
    setNotification({
      type: "success",
      message: "Profile updated successfully!",
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const changePassword = (e) => {
    e.preventDefault();

    // Simple validation
    if (passwords.new !== passwords.confirm) {
      setNotification({
        type: "error",
        message: "New passwords do not match!",
      });
      return;
    }

    // In a real app, this would make an API call
    setNotification({
      type: "success",
      message: "Password changed successfully!",
    });

    // Reset password fields
    setPasswords({
      current: "",
      new: "",
      confirm: "",
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="bg-white/10 bg-opacity-10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-2">Admin Settings</h1>
        <p className="text-blue-100">
          Manage your profile and security settings
        </p>
      </div>

      {notification && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            notification.type === "success"
              ? "bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30"
              : "bg-red-500 bg-opacity-20 text-red-300 border border-red-500 border-opacity-30"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 bg-opacity-5 rounded-xl p-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            Profile Information
          </h2>
          <form onSubmit={updateProfile}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-blue-100 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={admin.name}
                onChange={handleProfileChange}
                required
                className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-blue-100 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={admin.email}
                onChange={handleProfileChange}
                required
                className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-blue-100 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={admin.phone}
                onChange={handleProfileChange}
                required
                className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiSave size={16} />
              <span>Save Changes</span>
            </button>
          </form>
        </div>

        <div className="bg-white/10 bg-opacity-5 rounded-xl p-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            Change Password
          </h2>
          <form onSubmit={changePassword}>
            <div className="mb-4">
              <label htmlFor="current" className="block text-blue-100 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  id="current"
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPassword.current ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="new" className="block text-blue-100 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  id="new"
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPassword.new ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="confirm" className="block text-blue-100 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  id="confirm"
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-2 bg-white bg-opacity-20 border border-blue-300 border-opacity-30 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPassword.confirm ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiSave size={16} />
              <span>Change Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
