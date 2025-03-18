import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const Login = () => {
  return (
    <>
      <Header />
      <LoginMain />
      <Footer />
    </>
  );
};

const LoginMain = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
        "http://localhost:8000/api/user/login",
        formData,
        { withCredentials: true } 
      );
      console.log("Login Success:", res.data);

      // Store token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
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
              Login to your account
            </h1>
            <p className="text-gray-300">Enter your credentials to continue</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Input Fields */}
            {[
              {
                id: "email",
                label: "Email",
                type: "email",
                icon: <IoIosMail />,
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
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-300">
            Don't have an account?{" "}
            <a href="/signup" className="underline hover:text-white">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
