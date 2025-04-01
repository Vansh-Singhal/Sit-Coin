import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { IoWallet, IoSend, IoQrCode } from "react-icons/io5";
import { FaHistory, FaCreditCard, FaUser } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import React from "react";
import { useSelector } from "react-redux";
import useGetAllTransactions from "@/hooks/useGetAllTransactions";
import useGetUserBalance from "@/hooks/useGetUserBalance";
import useGetAllReversals from "@/hooks/useGetAllReversals";

const Dashboard = () => {
  useGetAllTransactions();
  useGetAllReversals();
  useGetUserBalance();
  return (
    <>
      <Header />
      <DashboardMain />
      <Footer />
    </>
  );
};

const DashboardMain = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const { user } = useSelector((state) => state.auth);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const totalBalance = `₹${user?.balance}`;

  const monthlySpending = transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      return (
        transaction.status === "completed" && // Only completed transactions
        transaction.sender._id === user?._id && // Only transactions where user is the sender
        transactionDate.getMonth() === currentMonth && // Filter for the current month
        transactionDate.getFullYear() === currentYear // Filter for the current year
      );
    })
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalMonthlySpending = `₹${monthlySpending}`;

  const totalSavings = transactions
    .filter((transaction) => {
      return (
        transaction.status === "completed" &&
        transaction.receiver._id === user?._id
      );
    })
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalSavingsAmount = `₹${totalSavings}`;

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* User Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {user?.fullname}
            </h1>
            <p className="text-gray-200">
              Manage your transactions and payments
            </p>
          </div>
          <Button variant="ghost" className="p-2 text-white hover:bg-white/20">
            <BiSolidBellRing className="h-6 w-6" />
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BalanceCard
            title="Available Balance"
            amount={totalBalance}
            icon={<IoWallet className="size-6" />}
          />
          <BalanceCard
            title="Monthly Expenses"
            amount={totalMonthlySpending}
            icon={<FaCreditCard className="size-6" />}
          />
          <BalanceCard
            title="Savings Balance"
            amount={totalSavingsAmount}
            icon={<FaHistory className="size-6" />}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ActionButton
            icon={<IoSend className="size-6" />}
            label="Send Money"
          />
          <ActionButton
            icon={<IoQrCode className="size-6" />}
            label="Scan & Pay"
          />
          <ActionButton
            icon={<FaCreditCard className="size-6" />}
            label="Cards"
          />
          <ActionButton icon={<FaUser className="size-6" />} label="Profile" />
        </div>

        {/* Recent Transactions */}
        <div className="rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Recent Transactions
            </h2>
            <Button
              variant="ghost"
              className="text-sm text-gray-200 hover:text-black"
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {transactions.map((transaction) =>
              transaction.status !== "failed" ? (
                <TransactionItem
                  key={transaction._id}
                  senderName={transaction.sender.fullname}
                  receiverName={transaction.receiver.fullname}
                  amount={`₹${transaction.amount}`}
                  type={
                    transaction.sender._id === user?._id ? "sent" : "received"
                  } // Checking if the sender is the logged-in user
                  date={new Date(transaction.createdAt).toLocaleString()}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const BalanceCard = ({ title, amount, icon }) => (
  <div className="p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 space-y-2">
    <div className="flex items-center justify-between">
      <p className="text-gray-200">{title}</p>
      <div className="h-5 w-5 text-blue-300">{icon}</div>
    </div>
    <h2 className="text-3xl font-bold text-white">{amount}</h2>
  </div>
);

const ActionButton = ({ icon, label }) => (
  <Button className="p-4 h-auto flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm">
    <div className="size-6 text-white">{icon}</div>
    <span className="text-white">{label}</span>
  </Button>
);

const TransactionItem = ({ senderName, receiverName, amount, type, date }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5">
      <div className="flex items-center gap-4">
        <div
          className={`p-2 rounded-full ${
            type === "sent" ? "bg-red-500/20" : "bg-green-500/20"
          }`}
        >
          {type === "sent" ? (
            <GoArrowUpRight className="h-5 w-5 text-red-400" />
          ) : (
            <GoArrowDownLeft className="h-5 w-5 text-green-400" />
          )}
        </div>
        <div>
          <p className="font-medium text-white">
            {senderName === user?.fullname ? receiverName : senderName}
          </p>

          <p className="text-sm text-gray-300">{date}</p>
        </div>
      </div>
      <p
        className={`font-medium ${
          type === "sent" ? "text-red-300" : "text-green-300"
        }`}
      >
        {`${type === "sent" ? "-" : "+"}`} {amount}
      </p>
    </div>
  );
};

export default Dashboard;
