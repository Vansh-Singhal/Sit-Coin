import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { IoWallet, IoSend, IoQrCode } from "react-icons/io5";
import { FaHistory, FaCreditCard, FaUser } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import React from "react";

const Dashboard = () => (
  <>
    <Header />
    <DashboardMain />
    <Footer />
  </>
);

const DashboardMain = () => {
  const recentTransactions = [
    {
      id: 1,
      name: "John Doe",
      amount: "-₹500",
      type: "sent",
      date: "Today, 2:30 PM",
    },
    {
      id: 2,
      name: "Amazon Pay",
      amount: "+₹1200",
      type: "received",
      date: "Today, 11:20 AM",
    },
    {
      id: 3,
      name: "Electric Bill",
      amount: "-₹2000",
      type: "sent",
      date: "Yesterday, 6:45 PM",
    },
    {
      id: 4,
      name: "Sarah Smith",
      amount: "+₹750",
      type: "received",
      date: "Yesterday, 3:15 PM",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#000428] to-[#004e92] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* User Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, Alex
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
            title="Total Balance"
            amount="₹45,250"
            change="+2.5%"
            icon={<IoWallet className="size-6" />}
            changeColor="text-green-300"
          />
          <BalanceCard
            title="Monthly Spending"
            amount="₹12,500"
            change="-4.2%"
            icon={<FaCreditCard className="size-6" />}
            changeColor="text-red-300"
          />
          <BalanceCard
            title="Total Savings"
            amount="₹28,350"
            change="+8.1%"
            icon={<FaHistory className="size-6" />}
            changeColor="text-green-300"
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
            {recentTransactions.map(({ id, name, amount, type, date }) => (
              <TransactionItem
                key={id}
                name={name}
                amount={amount}
                type={type}
                date={date}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

const BalanceCard = ({ title, amount, change, icon, changeColor }) => (
  <div className="p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 space-y-2">
    <div className="flex items-center justify-between">
      <p className="text-gray-200">{title}</p>
      <div className="h-5 w-5 text-blue-300">{icon}</div>
    </div>
    <h2 className="text-3xl font-bold text-white">{amount}</h2>
    <p className={`text-sm ${changeColor}`}>{change} from last month</p>
  </div>
);

const ActionButton = ({ icon, label }) => (
  <Button className="p-4 h-auto flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm">
    <div className="size-6 text-white">{icon}</div>
    <span className="text-white">{label}</span>
  </Button>
);

const TransactionItem = ({ name, amount, type, date }) => (
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
        <p className="font-medium text-white">{name}</p>
        <p className="text-sm text-gray-300">{date}</p>
      </div>
    </div>
    <p
      className={`font-medium ${
        type === "sent" ? "text-red-300" : "text-green-300"
      }`}
    >
      {amount}
    </p>
  </div>
);

export default Dashboard;
