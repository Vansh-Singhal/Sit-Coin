"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiCopy, FiEye, FiEyeOff } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/redux/authSlice";
import { adminLogout } from "@/redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";

// Profile Component
const Profile = () => {
  return (
    <>
      <Header />
      <ProfileMain />
      <Footer />
    </>
  );
};

// Profile Main Content
const ProfileMain = () => {
  const [showBalance, setShowBalance] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(adminLogout());
    navigate("/"); // Redirect to the home page
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Profile Card and QR Code side by side */}
          <div className="space-y-6">
            {/* User Info Card */}
            <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-24 h-24 border-2 border-blue-400">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg?height=96&width=96"}
                    alt={user?.fullname}
                  />
                  <AvatarFallback className="bg-blue-700 text-white text-2xl">
                    {user?.fullname
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-2xl">
                  {user?.fullname}
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Member since {new Date(user?.createdAt).toLocaleDateString()}
                </CardDescription>
                <Badge className="mt-2 bg-blue-600">Sitcoin User</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Email:</span>
                    <span className="font-medium">{user?.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Contact:</span>
                    <span className="font-medium">{user?.contact}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {user?.account_number}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(user?.account_number.toString())
                        }
                        className="text-blue-300 hover:text-blue-100"
                      >
                        <FiCopy size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full bg-white/90 border-white/20 text-black hover:bg-white/80"
                  onClick={() => navigate("/edit-profile")}
                >
                  <FiEdit2 className="mr-2" /> Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* QR Code Section */}
          <div className="space-y-6">
            <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Your Payment QR Code</CardTitle>
                <CardDescription className="text-blue-200">
                  Share this QR code to receive payments
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg">
                  <img
                    src={user?.qr || "/placeholder.svg"}
                    alt="Payment QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="mt-4 text-center text-sm text-blue-200">
                  Scan this code to pay {user?.fullname}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  variant="outline"
                  className="bg-white/90 border-white/20 text-black hover:bg-white/80"
                  onClick={() =>
                    copyToClipboard(user?.account_number.toString())
                  }
                >
                  <FiCopy className="mr-2" /> Copy Account Number
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Account Balance Section below Profile and QR Code */}
        <div className="mt-6">
          <Card className="backdrop-blur-md bg-white/10 border-white/20 text-white shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center">
                  <IoWalletOutline className="mr-2 text-2xl" /> Account Balance
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-200 hover:text-white hover:bg-white/10"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <FiEyeOff /> : <FiEye />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 mb-1">Available Balance</p>
                  <h2 className="text-3xl font-bold">
                    {showBalance
                      ? `₹${user?.balance?.toFixed(2) || "0.00"}`
                      : "₹•••••••"}
                  </h2>
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/add-money")}
                >
                  Add Money
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex align-center justify-center gap-5">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/send")}
              >
                Make Payments
              </Button>
              <Button
                variant="outline"
                className="w-full bg-white/90 border-white/20 text-black hover:bg-white/80"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Profile;
