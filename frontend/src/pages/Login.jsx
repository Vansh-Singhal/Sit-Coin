import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { IoIosMail } from "react-icons/io";
import { FaKeybase } from "react-icons/fa";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  return (
    <main className="min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-xl backdrop-blur-md bg-white/10 shadow-xl border border-white/20">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-white">Login your account</h1>
            <p className="text-gray-300">Enter your information before you get started</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-6">
              <label className="text-sm font-medium text-gray-200" htmlFor="email">
                Email
              </label> 
              <div className="relative my-2">
                <IoIosMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  className="w-full pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-sm font-medium text-gray-200" htmlFor="password">
                Password
              </label>
              <div className="relative my-2">
                <FaKeybase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  className="w-full pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  id="password"
                  placeholder="Create a password"
                  type="password"
                />
              </div>
            </div>

            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10">Login</Button>
          </form>

          <p className="text-sm text-center text-gray-300">
            Dont have an account?{" "}
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
