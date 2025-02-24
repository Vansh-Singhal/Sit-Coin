import React from "react";
import { motion } from "framer-motion";
import { FaArrowCircleLeft } from "react-icons/fa";
import { BiSolidZap } from "react-icons/bi";
import { IoShieldCheckmark } from "react-icons/io5";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const Home = () => {
  return (
    <>
      <Header />
      <div className="text-white min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92]">
        <HomeMain />
      </div>
      <Footer />
    </>
  );
};

const HomeMain = () => {
  return (
    <motion.main
      className="container mx-auto px-4 py-16 text-center"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.h1 className="text-4xl md:text-6xl font-bold mb-6" variants={fadeInUp}>
        Welcome to <span className="text-[#000428]">SITCOIN</span>
      </motion.h1>
      <motion.p className="text-xl md:text-2xl mb-12" variants={fadeInUp}>
        The UPI Payment App with Unprecedented Control
      </motion.p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <motion.img
          src="/placeholder.svg?height=400&width=300"
          alt="SITCOIN Screenshot"
          className="rounded-lg shadow-lg"
          variants={fadeInUp}
        />
        <motion.div className="text-left max-w-md" variants={fadeInUp}>
          <h2 className="text-3xl font-semibold mb-4">Introducing Payment Reversals</h2>
          <p className="text-lg mb-6">
            Made a mistake? No worries! With SITCOIN, you can reverse payments
            within minutes, giving you peace of mind and control over your transactions.
          </p>
        </motion.div>
      </div>

      <motion.div variants={fadeInUp}>
        <Button className="bg-[#000428] cursor-pointer mb-16" size="lg">
          Get Started
        </Button>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" variants={staggerContainer}>
        <FeatureCard
          icon={<FaArrowCircleLeft className="h-12 w-12 text-[#000428]" />}
          title="Easy Reversals"
          description="Reverse payments with just a few taps, within minutes of the transaction."
        />
        <FeatureCard
          icon={<BiSolidZap className="h-12 w-12 text-[#000428]" />}
          title="Lightning Fast"
          description="Experience the speed of UPI payments, now with added flexibility."
        />
        <FeatureCard
          icon={<IoShieldCheckmark className="h-12 w-12 text-[#000428]" />}
          title="Secure Transactions"
          description="Bank-grade security ensures your money and data are always protected."
        />
      </motion.div>

      <motion.div className="bg-white/10 rounded-lg p-8 mb-16" variants={fadeInUp}>
        <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
        <ol className="text-left list-decimal list-inside space-y-4">
          <li>Make a payment using SITCOIN's UPI interface</li>
          <li>If you need to reverse the payment, open the transaction details</li>
          <li>Click on the "Reverse Payment" option within the allowed timeframe</li>
          <li>Confirm the reversal, and the money will be back in your account</li>
        </ol>
      </motion.div>
    </motion.main>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div className="bg-white/10 p-6 rounded-lg text-center" variants={fadeInUp}>
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

export default Home;
