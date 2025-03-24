import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { FaRegCreditCard } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaPhoneAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/constant";

const Signup = () => {
  return (
    <>
      <Header />
      <SignupMain />
      <Footer />
    </>
  );
};

const SignupMain = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    account_number: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        formData
      );
      console.log("Signup Success:", res.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-xl backdrop-blur-md bg-white/10 shadow-xl border border-white/20">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-white">
              Create an account
            </h1>
            <p className="text-gray-300">
              Enter your information to get started
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Input Fields */}
            {[
              {
                id: "fullname",
                label: "Full Name",
                type: "text",
                icon: <CgProfile />,
              },
              {
                id: "email",
                label: "Email",
                type: "email",
                icon: <IoIosMail />,
              },
              {
                id: "contact",
                label: "Contact Number",
                type: "tel",
                icon: <FaPhoneAlt />,
              },
              {
                id: "account_number",
                label: "Account Number",
                type: "text",
                icon: <FaRegCreditCard />,
              },
              {
                id: "password",
                label: "Password",
                type: "password",
                icon: <FaKey />,
              },
            ].map(({ id, label, type, icon }) => (
              <div key={id} className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-200"
                  htmlFor={id}
                >
                  {label}
                </label>
                <div className="relative my-1">
                  {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {icon}
                    </span>
                  )}
                  <Input
                    className="w-full pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    id={id}
                    type={type}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    value={formData[id]}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            ))}

            {/* Error Message */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-white">
              Log in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
